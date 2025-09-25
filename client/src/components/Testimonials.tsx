// import React, { useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { Star } from 'lucide-react';
// import Avatar from './Avatar';

// interface Testimonial {
//   id: number;
//   name: string;
//   role: string;
//   content: string;
//   rating: number;
// }

// const testimonials: Testimonial[] = [
//   {
//     id: 1,
//     name: "Rahul Sharma",
//     role: "Engineering Student",
//     content: "BookShare has been a lifesaver for me during my studies. I was able to find all the textbooks I needed at affordable prices, and the delivery was super fast. Highly recommend to all students!",
//     rating: 5
//   },
//   {
//     id: 2,
//     name: "Priya Patel",
//     role: "Medical Student",
//     content: "The rental feature is amazing! I can access expensive medical books without breaking the bank. The platform is so easy to use and the community is really helpful.",
//     rating: 5
//   },
//   {
//     id: 3,
//     name: "Amit Kumar",
//     role: "Computer Science Student",
//     content: "As a CS student, I need the latest editions of programming books. BookShare lets me stay updated without spending a fortune. The real-time tracking feature is a game-changer!",
//     rating: 5
//   },
//   {
//     id: 4,
//     name: "Neha Singh",
//     role: "Business Student",
//     content: "I love how I can both buy and rent books. The platform is perfect for students on a budget. The seller verification gives me confidence in every transaction.",
//     rating: 5
//   },
//   {
//     id: 5,
//     name: "Vikram Mehta",
//     role: "Physics Student",
//     content: "BookShare has made my academic life so much easier. I can find rare physics books that aren't available in my college library. The delivery service is reliable and fast.",
//     rating: 5
//   },
//   {
//     id: 6,
//     name: "Anjali Desai",
//     role: "Literature Student",
//     content: "The variety of books available is incredible! From academic textbooks to literature classics, I can find everything I need. The community is supportive and the platform is user-friendly.",
//     rating: 5
//   }
// ];

// export default function Testimonials() {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     if (!scrollContainer) return;

//     let scrollInterval: ReturnType<typeof setInterval>;

//     const startAutoScroll = () => {
//       scrollInterval = setInterval(() => {
//         if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
//           scrollContainer.scrollLeft = 0;
//         } else {
//           scrollContainer.scrollLeft += 1;
//         }
//       }, 30);
//     };

//     const stopAutoScroll = () => {
//       clearInterval(scrollInterval);
//     };

//     startAutoScroll();

//     scrollContainer.addEventListener('mouseenter', stopAutoScroll);
//     scrollContainer.addEventListener('mouseleave', startAutoScroll);

//     return () => {
//       clearInterval(scrollInterval);
//       scrollContainer.removeEventListener('mouseenter', stopAutoScroll);
//       scrollContainer.removeEventListener('mouseleave', startAutoScroll);
//     };
//   }, []);

//   return (
//     <section className="py-16 bg-gray-50 dark:bg-gray-800">
//       <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
//         {/* Background effect */}
//         <div className="absolute inset-0 pointer-events-none z-0">
//           <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 opacity-60 blur-2xl rounded-full"></div>
//         </div>
//         {/* Main content (testimonials) */}
//         <div className="relative z-10">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
//               What Our Users Say
//             </h2>
//             <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//               Join thousands of satisfied students who have made BookShare their go-to platform for academic books.
//             </p>
//           </div>

//           <div 
//             ref={scrollRef}
//             className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
//             style={{ scrollBehavior: 'smooth' }}
//           >
//             {testimonials.map((testimonial, index) => (
//               <motion.div
//                 key={testimonial.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="flex-shrink-0 w-80 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
//               >
//                 <div className="flex items-center mb-4">
//                   <div className="flex-shrink-0">
//                     <Avatar name={testimonial.name} className="w-12 h-12" />
//                   </div>
//                   <div className="ml-4">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                       {testimonial.name}
//                     </h3>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       {testimonial.role}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
//                   ))}
//                 </div>

//                 <blockquote className="text-gray-700 dark:text-gray-300 italic">
//                   "{testimonial.content}"
//                 </blockquote>
//               </motion.div>
//             ))}
//           </div>

//           <div className="text-center mt-8">
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Scroll or hover to pause auto-scroll • {testimonials.length} testimonials
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }








import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Avatar from "./Avatar";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Engineering Student",
    content: "BookShare has been a lifesaver for me during my studies. I was able to find all the textbooks I needed at affordable prices, and the delivery was super fast. Highly recommend to all students!",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Medical Student",
    content: "The rental feature is amazing! I can access expensive medical books without breaking the bank. The platform is so easy to use and the community is really helpful.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "Computer Science Student",
    content: "As a CS student, I need the latest editions of programming books. BookShare lets me stay updated without spending a fortune. The real-time tracking feature is a game-changer!",
    rating: 5,
  },
  {
    id: 4,
    name: "Neha Singh",
    role: "Business Student",
    content: "I love how I can both buy and rent books. The platform is perfect for students on a budget. The seller verification gives me confidence in every transaction.",
    rating: 5,
  },
  {
    id: 5,
    name: "Vikram Mehta",
    role: "Physics Student",
    content: "BookShare has made my academic life so much easier. I can find rare physics books that aren't available in my college library. The delivery service is reliable and fast.",
    rating: 5,
  },
  {
    id: 6,
    name: "Anjali Desai",
    role: "Literature Student",
    content: "The variety of books available is incredible! From academic textbooks to literature classics, I can find everything I need. The community is supportive and the platform is user-friendly.",
    rating: 5,
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval: ReturnType<typeof setInterval>;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 1;
        }
      }, 24);
    };

    const stopAutoScroll = () => {
      clearInterval(scrollInterval);
    };

    startAutoScroll();

    scrollContainer.addEventListener("mouseenter", stopAutoScroll);
    scrollContainer.addEventListener("mouseleave", startAutoScroll);

    return () => {
      clearInterval(scrollInterval);
      scrollContainer.removeEventListener("mouseenter", stopAutoScroll);
      scrollContainer.removeEventListener("mouseleave", startAutoScroll);
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-tr from-blue-50 via-pink-50 to-violet-100 dark:from-blue-900 dark:via-pink-950 dark:to-violet-950 relative">
      {/* Soft background gradient/cloud */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[370px] bg-gradient-to-tr from-blue-200 via-pink-100 to-violet-200 opacity-45 blur-2xl rounded-full"></div>
        <div className="absolute bottom-0 left-24 w-60 h-60 bg-blue-400 opacity-15 blur-2xl rounded-full" />
        <div className="absolute top-0 right-36 w-48 h-48 bg-pink-400 opacity-10 blur-2xl rounded-full" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 dark:text-white mb-2 drop-shadow">
            What Our Users Say
          </h2>
          <p className="text-lg text-blue-900 dark:text-blue-200 max-w-2xl mx-auto drop-shadow">
            Thousands of students trust BookShare for affordable access to academic books.
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
          tabIndex={0}
          aria-label="Student testimonials"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.11 }}
              className="flex-shrink-0 w-80 min-w-[320px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-blue-100 dark:border-blue-900 p-7 hover:scale-[1.03] transition"
            >
              <div className="flex items-center mb-3">
                <Avatar name={testimonial.name} className="w-11 h-11" />
                <div className="ml-3">
                  <h3 className="text-base font-bold text-blue-700 dark:text-blue-200">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-blue-800 dark:text-gray-300 italic text-[15px] leading-relaxed">
                "{testimonial.content}"
              </blockquote>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Scroll or hover to pause auto-scroll &bull; {testimonials.length} testimonials
          </p>
        </div>
      </div>
    </section>
  );
}
