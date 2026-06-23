import { FaStar } from 'react-icons/fa';
import { FadeIn, StaggerContainer, StaggerItem } from '../common/Animate';
import { getImageUrl } from '../../services/api';

const Testimonials = ({ testimonials }) => {
  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="section-title">Testimonials</h2>
          <p className="section-subtitle mx-auto">
            What clients say about working with me
          </p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <StaggerItem key={item._id}>
              <div className="glass-card p-8 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400' : 'text-dark-300'}`}
                    />
                  ))}
                </div>
                <p className="text-dark-600 dark:text-dark-400 text-sm leading-relaxed flex-1 mb-6 italic">
                  &ldquo;{item.review}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={getImageUrl(item.photo) || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-dark-500">{item.position}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Testimonials;
