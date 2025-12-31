import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Building2, CheckCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ListProperty = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-32">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                List Your Property on{' '}
                <span className="text-primary">Good House</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Reach thousands of potential buyers and renters. Get your property in front of the right audience with our trusted platform.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why List With Us?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join hundreds of agents and property owners who trust Good House to showcase their properties.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  title: 'Verified Badge',
                  description: 'Get your listings verified to build trust with potential clients.',
                },
                {
                  title: 'Wide Reach',
                  description: 'Access our growing community of house hunters across Nigeria.',
                },
                {
                  title: 'Easy Management',
                  description: 'Simple tools to manage your listings and track inquiries.',
                },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <Building2 className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started</h2>
              <p className="text-muted-foreground mb-8">
                Ready to list your property? Contact our team and we&apos;ll help you get set up in no time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Phone className="w-5 h-5" />
                  Call Us: +234 800 123 4567
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Mail className="w-5 h-5" />
                  list@goodhouse.ng
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mt-8">
                Our team typically responds within 24 hours during business days.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ListProperty;
