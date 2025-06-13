
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Check, X, Star, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  customer_email: string;
  rating: number;
  comment: string | null;
  is_approved: boolean;
  created_at: string;
}

const ReviewsAdmin = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar avaliações",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string, approved: boolean) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ is_approved: approved })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Sucesso",
        description: `Avaliação ${approved ? 'aprovada' : 'rejeitada'} com sucesso!`,
      });
      fetchReviews();
    } catch (error) {
      console.error('Error updating review:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar avaliação",
        variant: "destructive",
      });
    }
  };

  const handleViewReview = (review: Review) => {
    setSelectedReview(review);
    setDialogOpen(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Avaliações</CardTitle>
          <CardDescription>
            Gerencie as avaliações dos produtos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Avaliação</TableHead>
                <TableHead>Comentário</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{review.customer_name}</div>
                      <div className="text-sm text-gray-500">{review.customer_email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-sm">({review.rating}/5)</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">
                      {review.comment || 'Sem comentário'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={review.is_approved ? 'default' : 'secondary'}>
                      {review.is_approved ? 'Aprovada' : 'Pendente'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(review.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewReview(review)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {!review.is_approved && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApprove(review.id, true)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      {review.is_approved && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApprove(review.id, false)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Avaliação</DialogTitle>
          </DialogHeader>
          
          {selectedReview && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Informações do Cliente</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Nome:</strong> {selectedReview.customer_name}</div>
                    <div><strong>E-mail:</strong> {selectedReview.customer_email}</div>
                    <div><strong>Data:</strong> {format(new Date(selectedReview.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Avaliação</h4>
                  <div className="flex items-center space-x-2 mb-2">
                    {renderStars(selectedReview.rating)}
                    <span className="text-sm">({selectedReview.rating}/5)</span>
                  </div>
                  <Badge variant={selectedReview.is_approved ? 'default' : 'secondary'}>
                    {selectedReview.is_approved ? 'Aprovada' : 'Pendente'}
                  </Badge>
                </div>
              </div>

              {selectedReview.comment && (
                <div>
                  <h4 className="font-semibold mb-2">Comentário</h4>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm">
                    {selectedReview.comment}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                {!selectedReview.is_approved ? (
                  <Button
                    onClick={() => {
                      handleApprove(selectedReview.id, true);
                      setDialogOpen(false);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Aprovar
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleApprove(selectedReview.id, false);
                      setDialogOpen(false);
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Rejeitar
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewsAdmin;
