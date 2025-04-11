
-- Create media_expenditure table
CREATE TABLE public.media_expenditure (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  medium TEXT NOT NULL,
  expenditure_2025 DECIMAL(12,2) NOT NULL,
  expenditure_2024 DECIMAL(12,2) NOT NULL,
  percentage_change DECIMAL(6,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add initial data
INSERT INTO public.media_expenditure (medium, expenditure_2025, expenditure_2024, percentage_change)
VALUES 
  ('TV', 8450079.36, 9009609.68, -6.21),
  ('RADIO', 3410610.70, 2991942.90, 13.99),
  ('OUTDOOR', 2286702.50, 2492276.60, -8.25),
  ('MALLS', 445400.00, 394654.00, 12.89),
  ('AIRPORTS', 587500.00, 512887.00, 14.55),
  ('LOCAL WEBSITE', 2436352.50, 2473162.00, -1.49),
  ('NEWSPAPERS', 1078190.00, 1211027.50, -10.97),
  ('GOOGLE ADS', 3664023.26, 3392614.13, 8.00),
  ('SOCIAL MEDIA', 3855147.50, 3537750.00, 8.97),
  ('MAGAZINES', 426440.00, 541285.00, -21.22);

-- Add RLS policy
ALTER TABLE public.media_expenditure ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" 
  ON public.media_expenditure
  FOR SELECT 
  USING (true);
