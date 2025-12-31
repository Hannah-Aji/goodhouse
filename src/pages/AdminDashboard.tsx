import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Eye, LogOut, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Submission {
  id: string;
  title: string;
  property_type: string;
  listing_type: string;
  price: number;
  price_period: string | null;
  state: string;
  city: string;
  locality: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  size: number;
  description: string;
  is_serviced: boolean;
  is_furnished: boolean;
  features: string[];
  agent_name: string;
  agent_phone: string;
  agent_email: string | null;
  agent_company: string | null;
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason: string | null;
  created_at: string;
  reviewed_at: string | null;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    // Check if already authenticated (simple session storage)
    const token = sessionStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
      fetchSubmissions();
    }
  }, []);

  const handleLogin = async () => {
    if (!password.trim()) {
      toast({ title: 'Error', description: 'Please enter a password', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: { action: 'login', password },
      });

      if (error) throw error;

      if (data.success) {
        sessionStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
        fetchSubmissions();
        toast({ title: 'Success', description: 'Logged in successfully' });
      } else {
        toast({ title: 'Error', description: data.error || 'Invalid password', variant: 'destructive' });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({ title: 'Error', description: 'Failed to authenticate', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setSubmissions([]);
    navigate('/');
  };

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: { action: 'get-submissions' },
      });

      if (error) throw error;

      if (data.success) {
        setSubmissions(data.submissions || []);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast({ title: 'Error', description: 'Failed to fetch submissions', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'approved' | 'rejected', reason?: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: { action: 'update-status', submissionId: id, status, rejectionReason: reason },
      });

      if (error) throw error;

      if (data.success) {
        toast({ title: 'Success', description: `Submission ${status}` });
        fetchSubmissions();
        setIsViewOpen(false);
        setIsRejectOpen(false);
        setRejectionReason('');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast({ title: 'Error', description: 'Failed to update submission', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSubmissions = submissions.filter(
    (s) => filterStatus === 'all' || s.status === filterStatus
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(price);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-card rounded-2xl border border-border p-8"
          >
            <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
              <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Login
              </Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Property Submissions</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={fetchSubmissions} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Refresh'}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus(status)}
              className="capitalize"
            >
              {status}
              {status !== 'all' && (
                <Badge variant="secondary" className="ml-2">
                  {submissions.filter((s) => s.status === status).length}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No submissions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {submission.title}
                    </TableCell>
                    <TableCell className="capitalize">
                      {submission.property_type} / {submission.listing_type}
                    </TableCell>
                    <TableCell>
                      {submission.locality}, {submission.city}
                    </TableCell>
                    <TableCell>{formatPrice(submission.price)}</TableCell>
                    <TableCell>{submission.agent_name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          submission.status === 'approved'
                            ? 'default'
                            : submission.status === 'rejected'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                        {submission.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(submission.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setIsViewOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {submission.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-green-600 hover:text-green-700"
                              onClick={() => updateStatus(submission.id, 'approved')}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => {
                                setSelectedSubmission(submission);
                                setIsRejectOpen(true);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
      <Footer />

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedSubmission?.title}</DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-muted-foreground">Property Type:</span>
                  <p className="capitalize">{selectedSubmission.property_type}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Listing Type:</span>
                  <p className="capitalize">{selectedSubmission.listing_type}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Price:</span>
                  <p>
                    {formatPrice(selectedSubmission.price)}
                    {selectedSubmission.price_period && ` / ${selectedSubmission.price_period}`}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Size:</span>
                  <p>{selectedSubmission.size} sqm</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Bedrooms:</span>
                  <p>{selectedSubmission.bedrooms}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Bathrooms:</span>
                  <p>{selectedSubmission.bathrooms}</p>
                </div>
              </div>

              <div>
                <span className="text-muted-foreground">Location:</span>
                <p>
                  {selectedSubmission.address}, {selectedSubmission.locality},{' '}
                  {selectedSubmission.city}, {selectedSubmission.state}
                </p>
              </div>

              <div>
                <span className="text-muted-foreground">Description:</span>
                <p className="whitespace-pre-wrap">{selectedSubmission.description}</p>
              </div>

              <div className="flex gap-2">
                {selectedSubmission.is_serviced && <Badge>Serviced</Badge>}
                {selectedSubmission.is_furnished && <Badge>Furnished</Badge>}
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Agent Details</h4>
                <p>{selectedSubmission.agent_name}</p>
                <p>{selectedSubmission.agent_phone}</p>
                {selectedSubmission.agent_email && <p>{selectedSubmission.agent_email}</p>}
                {selectedSubmission.agent_company && <p>{selectedSubmission.agent_company}</p>}
              </div>

              {selectedSubmission.status === 'rejected' && selectedSubmission.rejection_reason && (
                <div className="bg-destructive/10 text-destructive p-3 rounded-lg">
                  <span className="font-medium">Rejection Reason:</span>
                  <p>{selectedSubmission.rejection_reason}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            {selectedSubmission?.status === 'pending' && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsViewOpen(false);
                    setIsRejectOpen(true);
                  }}
                >
                  Reject
                </Button>
                <Button onClick={() => updateStatus(selectedSubmission.id, 'approved')}>
                  Approve
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Submission</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Enter reason for rejection..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedSubmission && updateStatus(selectedSubmission.id, 'rejected', rejectionReason)}
              disabled={!rejectionReason.trim()}
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;