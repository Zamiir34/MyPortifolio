import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ message = 'Loading Portfolio...' }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark-950"
      >
        <div className="text-center px-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-6"
          />
          <motion.h2
            key={message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-2xl font-display font-bold gradient-text"
          >
            {message}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
            className="h-1 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full mt-4 max-w-xs mx-auto"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
