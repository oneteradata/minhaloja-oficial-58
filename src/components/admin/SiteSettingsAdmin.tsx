
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface SiteSettings {
  id: string;
  site_name: string;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  whatsapp_number: string | null;
  whatsapp_message: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  address: string | null;
}

const SiteSettingsAdmin = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error) throw error;
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar configurações",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({
          site_name: settings.site_name,
          logo_url: settings.logo_url,
          primary_color: settings.primary_color,
          secondary_color: settings.secondary_color,
          whatsapp_number: settings.whatsapp_number,
          whatsapp_message: settings.whatsapp_message,
          contact_email: settings.contact_email,
          contact_phone: settings.contact_phone,
          address: settings.address,
          updated_at: new Date().toISOString()
        })
        .eq('id', settings.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Configurações salvas com sucesso!",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar configurações",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!settings) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p>Configurações não encontradas</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações Gerais</CardTitle>
          <CardDescription>
            Configure as informações básicas do seu site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="site_name">Nome do Site</Label>
              <Input
                id="site_name"
                value={settings.site_name}
                onChange={(e) => setSettings({...settings, site_name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo_url">URL do Logo</Label>
              <Input
                id="logo_url"
                value={settings.logo_url || ''}
                onChange={(e) => setSettings({...settings, logo_url: e.target.value})}
                placeholder="https://exemplo.com/logo.png"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary_color">Cor Primária</Label>
              <Input
                id="primary_color"
                type="color"
                value={settings.primary_color}
                onChange={(e) => setSettings({...settings, primary_color: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondary_color">Cor Secundária</Label>
              <Input
                id="secondary_color"
                type="color"
                value={settings.secondary_color}
                onChange={(e) => setSettings({...settings, secondary_color: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contato e WhatsApp</CardTitle>
          <CardDescription>
            Configure as informações de contato e integração com WhatsApp
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp_number">Número do WhatsApp</Label>
              <Input
                id="whatsapp_number"
                value={settings.whatsapp_number || ''}
                onChange={(e) => setSettings({...settings, whatsapp_number: e.target.value})}
                placeholder="5511999999999"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_phone">Telefone de Contato</Label>
              <Input
                id="contact_phone"
                value={settings.contact_phone || ''}
                onChange={(e) => setSettings({...settings, contact_phone: e.target.value})}
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp_message">Mensagem Padrão do WhatsApp</Label>
            <Textarea
              id="whatsapp_message"
              value={settings.whatsapp_message || ''}
              onChange={(e) => setSettings({...settings, whatsapp_message: e.target.value})}
              placeholder="Olá! Gostaria de mais informações sobre os produtos."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_email">E-mail de Contato</Label>
            <Input
              id="contact_email"
              type="email"
              value={settings.contact_email || ''}
              onChange={(e) => setSettings({...settings, contact_email: e.target.value})}
              placeholder="contato@loja.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Textarea
              id="address"
              value={settings.address || ''}
              onChange={(e) => setSettings({...settings, address: e.target.value})}
              placeholder="Rua das Tecnologias, 123 - São Paulo, SP"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};

export default SiteSettingsAdmin;
