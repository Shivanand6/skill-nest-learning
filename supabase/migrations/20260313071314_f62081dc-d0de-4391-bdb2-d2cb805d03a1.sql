
-- Replace the overly permissive feedback insert policy with one that allows authenticated or anonymous inserts
DROP POLICY "Anyone can insert feedback" ON public.feedback;
CREATE POLICY "Authenticated users can insert feedback" ON public.feedback FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
