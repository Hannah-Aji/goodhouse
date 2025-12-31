import { MapPin, Shield, Clock, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Shield,
    title: 'Verified Listings',
    description: 'All properties are verified by our team to ensure authenticity and quality.',
  },
  {
    icon: MapPin,
    title: 'Prime Locations',
    description: 'Properties in the most sought-after neighborhoods across Nigeria.',
  },
  {
    icon: Clock,
    title: 'Quick Process',
    description: 'Streamlined buying and renting process to save you time.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our dedicated team is always ready to assist you.',
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 gradient-warm">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-accent font-medium text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
            The PropNaija Advantage
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
