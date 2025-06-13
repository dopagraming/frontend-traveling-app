import React, { useState } from 'react';
import { 
  Play, 
  MapPin, 
  Users, 
  Award, 
  Globe, 
  Heart, 
  Star,
  Phone,
  Mail,
  Calendar,
  Camera
} from 'lucide-react';

const AboutUs = () => {
  const [playingVideo, setPlayingVideo] = useState(false);

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Travel enthusiast with 15+ years of experience in creating unforgettable journeys.",
      specialties: ["Adventure Travel", "Cultural Tours"]
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Operations expert ensuring smooth and safe travel experiences worldwide.",
      specialties: ["Logistics", "Safety Management"]
    },
    {
      name: "Emma Rodriguez",
      role: "Travel Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Creative designer crafting unique and personalized travel itineraries.",
      specialties: ["Custom Tours", "Luxury Travel"]
    },
    {
      name: "David Thompson",
      role: "Local Guide Coordinator",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Connecting travelers with authentic local experiences and expert guides.",
      specialties: ["Local Culture", "Historical Tours"]
    }
  ];

  const offices = [
    {
      country: "United States",
      city: "New York",
      address: "123 Broadway, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "ny@wanderlust.com",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=250&fit=crop",
      guides: 12,
      languages: ["English", "Spanish", "French"]
    },
    {
      country: "United Kingdom",
      city: "London",
      address: "45 Oxford Street, London W1D 2DZ",
      phone: "+44 20 7123 4567",
      email: "london@wanderlust.com",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=250&fit=crop",
      guides: 8,
      languages: ["English", "French", "German"]
    },
    {
      country: "Japan",
      city: "Tokyo",
      address: "1-1-1 Shibuya, Tokyo 150-0002",
      phone: "+81 3-1234-5678",
      email: "tokyo@wanderlust.com",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop",
      guides: 15,
      languages: ["Japanese", "English", "Korean"]
    },
    {
      country: "Australia",
      city: "Sydney",
      address: "100 George Street, Sydney NSW 2000",
      phone: "+61 2 1234 5678",
      email: "sydney@wanderlust.com",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      guides: 10,
      languages: ["English", "Mandarin", "Japanese"]
    }
  ];

  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "50,000+", label: "Happy Travelers" },
    { icon: <Globe className="w-8 h-8" />, number: "120+", label: "Destinations" },
    { icon: <Award className="w-8 h-8" />, number: "15+", label: "Years Experience" },
    { icon: <Star className="w-8 h-8" />, number: "4.9", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-soft-sand">
      {/* Hero Section */}
      <div className="bg-natural-blue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Wanderlust
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Creating unforgettable travel experiences since 2009
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-warm-orange mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold">{stat.number}</div>
                  <div className="opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-deep-charcoal mb-6">
                Our Story
              </h2>
              <p className="text-xl text-cool-gray">
                Watch how we've been transforming travel dreams into reality
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-blue">
              {!playingVideo ? (
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=450&fit=crop"
                    alt="Our Story"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button
                      onClick={() => setPlayingVideo(true)}
                      className="bg-white/90 hover:bg-white rounded-full p-6 transition-all duration-300 transform hover:scale-110"
                    >
                      <Play className="w-12 h-12 text-natural-blue ml-1" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-black flex items-center justify-center">
                  <div className="text-white text-center">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Video would play here</p>
                    <button
                      onClick={() => setPlayingVideo(false)}
                      className="mt-4 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-deep-charcoal mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-cool-gray mb-6">
                  We believe that travel has the power to transform lives, broaden perspectives, 
                  and create lasting memories. Our mission is to make extraordinary travel 
                  experiences accessible to everyone while promoting sustainable and responsible tourism.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Heart className="w-6 h-6 text-warm-orange flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-deep-charcoal">Passionate Service</h3>
                      <p className="text-cool-gray">Every journey is crafted with love and attention to detail</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-6 h-6 text-natural-blue flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-deep-charcoal">Global Expertise</h3>
                      <p className="text-cool-gray">Local knowledge and worldwide connections</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-gentle-olive flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-deep-charcoal">Excellence</h3>
                      <p className="text-cool-gray">Committed to delivering exceptional experiences</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop"
                  alt="Our Mission"
                  className="rounded-2xl shadow-soft"
                />
                <div className="absolute -bottom-6 -right-6 bg-warm-orange text-deep-charcoal p-6 rounded-2xl shadow-warm">
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-charcoal mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-cool-gray max-w-2xl mx-auto">
              Passionate travel experts dedicated to creating your perfect journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-blue transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-deep-charcoal mb-1">{member.name}</h3>
                  <p className="text-natural-blue font-medium mb-3">{member.role}</p>
                  <p className="text-cool-gray text-sm mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-natural-blue/10 text-natural-blue text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-charcoal mb-6">
              Our Global Offices
            </h2>
            <p className="text-xl text-cool-gray max-w-2xl mx-auto">
              Local expertise and support wherever your journey takes you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="bg-soft-sand rounded-2xl shadow-soft overflow-hidden hover:shadow-blue transition-all duration-300">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={office.image}
                      alt={`${office.city} Office`}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-natural-blue" />
                      <h3 className="text-xl font-bold text-deep-charcoal">
                        {office.city}, {office.country}
                      </h3>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-cool-gray flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-cool-gray">{office.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-cool-gray" />
                        <span className="text-sm text-cool-gray">{office.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-cool-gray" />
                        <span className="text-sm text-cool-gray">{office.email}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-lg font-bold text-natural-blue">{office.guides}</div>
                        <div className="text-xs text-cool-gray">Local Guides</div>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-lg font-bold text-warm-orange">{office.languages.length}</div>
                        <div className="text-xs text-cool-gray">Languages</div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-xs text-cool-gray mb-2">Languages Spoken:</div>
                      <div className="flex flex-wrap gap-1">
                        {office.languages.map((lang, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gentle-olive/20 text-gentle-olive text-xs rounded-full"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-natural-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who have discovered the world with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-warm-orange text-deep-charcoal font-semibold rounded-xl hover:bg-warm-orange-dark transition-all duration-300 shadow-warm hover:shadow-xl transform hover:-translate-y-1">
              Plan Your Trip
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-natural-blue transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;