// Configurações do Supabase
// Para alterar para outro projeto Supabase, basta modificar as variáveis abaixo

export const SUPABASE_CONFIG = {
  url: "https://csfnewhtufuoevcyurtt.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzZm5ld2h0dWZ1b2V2Y3l1cnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4Nzc1MzcsImV4cCI6MjA2NzQ1MzUzN30.eqwOnHZ8TcC08gS4VbNS38aG-J4mHJmpKT0NO8VSHL0",
  projectId: "csfnewhtufuoevcyurtt"
};

// Configurações de autenticação
export const SUPABASE_AUTH_CONFIG = {
  storage: localStorage,
  persistSession: true,
  autoRefreshToken: true,
};