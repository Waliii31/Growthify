import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { PostAnalysis } from '@/types';
import { useAuth } from './useAuth';

interface AnalysisContextType {
  analyses: PostAnalysis[];
  selectedAnalysis: PostAnalysis | null;
  isLoading: boolean;
  usage: MonthlyUsage;
  analyzeDraft: (text: string, tone: string, audience: string) => Promise<PostAnalysis>;
  selectAnalysis: (item: PostAnalysis) => void;
  deleteAnalysis: (id: string) => Promise<void>;
  saveToLibrary: (item: PostAnalysis) => Promise<void>;
}

const AnalysisContext = createContext<AnalysisContextType | null>(null);

interface MonthlyUsage {
  limit: number;
  used: number;
  remaining: number;
  resetsAt: string | null;
}

const defaultUsage: MonthlyUsage = {
  limit: 10,
  used: 0,
  remaining: 10,
  resetsAt: null,
};

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const [analyses, setAnalyses] = useState<PostAnalysis[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<PostAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [usage, setUsage] = useState<MonthlyUsage>(defaultUsage);

  // Fetch initial analyses and usage from backend when user logs in
  useEffect(() => {
    const fetchAccountData = async () => {
      if (!user?.token) {
        setAnalyses([]);
        setUsage(defaultUsage);
        return;
      }
      try {
        const [analysesRes, usageRes] = await Promise.all([
          fetch('/api/analyses', {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          fetch('/api/users/usage', {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
        ]);

        if (analysesRes.ok) {
          const data = await analysesRes.json();
          const mappedData = data.map((d: any) => ({
            ...d,
            id: d._id,
            dateStr: new Date(d.createdAt).toLocaleDateString(),
          }));
          setAnalyses(mappedData);
        }

        if (usageRes.ok) {
          setUsage(await usageRes.json());
        }
      } catch (err) {
        console.error('Failed to fetch account data', err);
      }
    };

    fetchAccountData();
  }, [user?.token]);

  const refreshUsage = useCallback(async () => {
    if (!user?.token) return;
    try {
      const res = await fetch('/api/users/usage', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.ok) {
        setUsage(await res.json());
      }
    } catch (err) {
      console.error('Failed to refresh usage', err);
    }
  }, [user?.token]);

  const analyzeDraft = useCallback(
    async (draftText: string, tone: string, audience: string): Promise<PostAnalysis> => {
      setIsLoading(true);

      try {
        // If not logged in, mock the behavior temporarily
        if (!user?.token) {
          throw new Error('Must be logged in to analyze');
        }

        const res = await fetch('/api/analyses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ draftText, tone, audience }),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          throw new Error(errorData?.message || 'Analysis failed');
        }

        const data = await res.json();
        if (data.usage) {
          setUsage(data.usage);
        } else {
          refreshUsage();
        }

        const newAnalysis: PostAnalysis = {
          ...data,
          id: data._id,
          dateStr: 'Just now',
        };

        setAnalyses((prev) => [newAnalysis, ...prev]);
        setSelectedAnalysis(newAnalysis);
        setIsLoading(false);
        return newAnalysis;
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        throw err;
      }
    },
    [refreshUsage, user?.token],
  );

  const selectAnalysis = useCallback((item: PostAnalysis) => {
    setSelectedAnalysis(item);
  }, []);

  const deleteAnalysis = useCallback(
    async (id: string) => {
      try {
        if (user?.token) {
          await fetch(`/api/analyses/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${user.token}` },
          });
        }
        setAnalyses((prev) => prev.filter((a) => a.id !== id));
        refreshUsage();
      } catch (err) {
        console.error('Failed to delete analysis', err);
      }
    },
    [refreshUsage, user?.token],
  );

  const saveToLibrary = useCallback(
    async (updatedItem: PostAnalysis) => {
      try {
        if (user?.token) {
          const res = await fetch(`/api/analyses/${updatedItem.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(updatedItem),
          });
          if (!res.ok) throw new Error('Failed to save');
        }
        setAnalyses((prev) => prev.map((a) => (a.id === updatedItem.id ? updatedItem : a)));
        setSelectedAnalysis(updatedItem);
      } catch (err) {
        console.error(err);
      }
    },
    [user?.token],
  );

  return (
    <AnalysisContext.Provider
      value={{
        analyses,
        selectedAnalysis,
        isLoading,
        usage,
        analyzeDraft,
        selectAnalysis,
        deleteAnalysis,
        saveToLibrary,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error('useAnalysis must be used within an AnalysisProvider');
  return ctx;
}
