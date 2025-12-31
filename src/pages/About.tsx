import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Home, Heart, Users, Sparkles } from 'lucide-react';

const About = () => {
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
                We Believe House Hunting Should Be{' '}
                <span className="text-primary">Friendly</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                At Good House, we insist that house hunting should not be monstrous but friendly—even when it comes to UI-friendly layouts and sentiment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything we do is guided by our commitment to making your property search as pleasant as possible.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Home,
                  title: 'Simple Search',
                  description: 'Finding your dream home should be straightforward, not overwhelming. Our intuitive interface makes it easy.',
                },
                {
                  icon: Heart,
                  title: 'Human Touch',
                  description: 'Behind every listing is a story. We bring warmth and empathy to the property search experience.',
                },
                {
                  icon: Users,
                  title: 'Community First',
                  description: 'We connect you with trusted agents and verified listings, building a community you can rely on.',
                },
                {
                  icon: Sparkles,
                  title: 'Delightful Design',
                  description: 'Every pixel is crafted with care. We believe beautiful design makes the journey more enjoyable.',
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  We&apos;re on a mission to transform the Nigerian real estate experience. No more endless scrolling through cluttered websites. No more confusing interfaces. No more frustration.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Good House is designed with you in mind—clean layouts, verified listings, and a seamless experience from search to your new front door. Because finding a home should feel like coming home, even before you get there.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-primary rounded-3xl p-8 md:p-12 text-center text-primary-foreground"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Find Your Good House?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Start your friendly house hunting journey today. Browse thousands of verified properties across Nigeria.
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-3 rounded-full font-medium hover:bg-background/90 transition-colors"
              >
                <Home className="w-5 h-5" />
                Start Searching
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
