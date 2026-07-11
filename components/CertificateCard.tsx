"use client"
import Image from 'next/image'
import { motion } from 'motion/react'
import { FiExternalLink } from 'react-icons/fi';


type Certificate = {
  mediaUrl?: string;
  name: string;
  description: string;
};

const CertificateCard = ({ CertificateData }: { CertificateData: Certificate[] }) => {
  return (
    <section id="certificates" className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Certificates and Achievements</h2>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {CertificateData.map((certificate, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }} // Stagger effect
            viewport={{ once: true }}
            className="group relative bg-card rounded-xl overflow-hidden border border-border hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full"
          >
            {/* Image Container */}
            <div className="relative h-56 w-full overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
              <Image
                src={`/assets/certificates/${certificate.name.toLowerCase().replaceAll(" ", "-")}.png`}
                alt={certificate.name}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>


            {/* Content */}
            <div className="p-6 flex flex-col grow">
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {certificate.name}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-3 mb-4 grow text-wrap">
                {certificate.description}
              </p>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default CertificateCard
