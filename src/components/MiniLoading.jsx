// const MiniLoading = () => (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
//     </div>
//   );
  
//   export default MiniLoading;




// const MiniLoading = () => (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50">
//       <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin fast-spin"></div>
//       <style>
//         {`
//           @keyframes fastSpin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
  
//           .fast-spin {
//             animation: fastSpin 0.5s linear infinite;
//           }
//         `}
//       </style>
//     </div>
//   );
  
//   export default MiniLoading;
  


const MiniLoading = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-8 h-8 rounded-full border-4 border-transparent animate-spin border-t-blue-500 border-r-blue-300 border-b-blue-300 border-l-blue-500 fast-spin"></div>
      <style>{`
        .fast-spin { animation: fastSpin 0.4s linear infinite; }
        @keyframes fastSpin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );

// const MiniLoading = () => (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="relative w-12 h-12">
//         <div className="absolute inset-0 rounded-full border-4 border-transparent border-l-blue-400 border-t-blue-600 animate-orbit-slow"></div>
//         <div className="absolute inset-1 rounded-full border-4 border-transparent border-r-pink-400 border-b-pink-600 animate-orbit-fast"></div>
//       </div>
//       <style>{`
//         .animate-orbit-slow { animation: orbit 3s linear infinite; }
//         .animate-orbit-fast { animation: orbit 1.5s linear infinite reverse; }
//         @keyframes orbit { to { transform: rotate(360deg); } }
//       `}</style>
//     </div>
//   );

// Three Ring Loading Animation
// const MiniLoading = () => (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/80">
//       <div className="relative w-16 h-16">
//         <div className="absolute inset-0 border-2 border-amber-500/30 rounded-full animate-pulse-ring"></div>
//         <div className="absolute inset-3 border-2 border-amber-500/50 rounded-full animate-pulse-ring animation-delay-200"></div>
//         <div className="absolute inset-6 border-2 border-amber-500 rounded-full animate-pulse-ring animation-delay-400"></div>
//       </div>
//       <style>{`
//         .animate-pulse-ring {
//           animation: pulse-ring 2s cubic-bezier(0.22, 0.61, 0.36, 1) infinite;
//         }
//         .animation-delay-200 { animation-delay: 0.2s; }
//         .animation-delay-400 { animation-delay: 0.4s; }
//         @keyframes pulse-ring {
//           0% { transform: scale(0.8); opacity: 0.7; }
//           70% { transform: scale(1.3); opacity: 0; }
//           100% { opacity: 0; }
//         }
//       `}</style>
//     </div>
//   );

// Diamond ring Loading Animation
// const MiniLoading = () => (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="relative w-14 h-14">
//         <div className="absolute inset-0 border-2 border-transparent border-t-gray-300 border-r-gray-300 rounded-full animate-spin"></div>
//         <div className="absolute inset-1 border-2 border-transparent border-b-amber-400 border-l-amber-400 rounded-full animate-spin-reverse"></div>
//         <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-amber-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
//       </div>
//       <style>{`
//         .animate-spin { animation: spin 2s linear infinite; }
//         .animate-spin-reverse { animation: spin 1.8s linear infinite reverse; }
//         @keyframes spin { to { transform: rotate(360deg); } }
//         .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }
//         @keyframes pulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.5); } }
//       `}</style>
//     </div>
//   );

// Floating Products Loading Animation
// const MiniLoading = () => (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="relative w-24 h-24">
//         {[0, 1, 2].map((i) => (
//           <div key={i} className={`absolute w-8 h-8 bg-white border border-gray-200 rounded shadow-md animate-float-product`}
//             style={{
//               top: `${Math.sin(i * 1.2) * 15 + 20}px`,
//               left: `${Math.cos(i * 1.2) * 15 + 20}px`,
//               animationDelay: `${i * 0.3}s`,
//               zIndex: 3 - i
//             }}>
//             <div className="w-6 h-1 bg-gray-200 mt-1 mx-auto"></div>
//           </div>
//         ))}
//       </div>
//       <style>{`
//         .animate-float-product {
//           animation: float-product 2s ease-in-out infinite;
//         }
//         @keyframes float-product {
//           0%, 100% { transform: translateY(0) rotate(0deg); }
//           50% { transform: translateY(-15px) rotate(5deg); }
//         }
//       `}</style>
//     </div>
//   );

// const MiniLoading = () => (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="relative">
//         <div className="w-12 h-12 rounded-full border-4 border-blue-400/20 animate-pulse-glow"></div>
//         <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-t-blue-400 border-r-blue-400 animate-spin"></div>
//       </div>
//       <style>{`
//         .animate-spin { animation: spin 1.2s linear infinite; }
//         @keyframes spin { to { transform: rotate(360deg); } }
//         .animate-pulse-glow {
//           animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }
//         @keyframes pulse-glow {
//           0%, 100% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.3); }
//           50% { box-shadow: 0 0 0 12px rgba(96, 165, 250, 0); }
//         }
//       `}</style>
//     </div>
//   );


// Expanding Bars Loading Animation
// const MiniLoading = () => (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="flex space-x-1 h-8 items-end">
//         {[...Array(5)].map((_, i) => (
//           <div
//             key={i}
//             className="w-1.5 bg-amber-500 animate-expand-bar"
//             style={{ animationDelay: `${i * 0.15}s` }}
//           />
//         ))}
//       </div>
//       <style>{`
//         .animate-expand-bar {
//           animation: expandBar 1.2s ease-in-out infinite;
//           height: 30%;
//         }
//         @keyframes expandBar {
//           0%, 100% { height: 30%; }
//           50% { height: 80%; }
//         }
//       `}</style>
//     </div>
//   );


//elegant dual spinner
// const MiniLoading = () => (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="relative w-14 h-14">
//         <div className="absolute inset-0 border-2 border-gray-300 rounded-full animate-spin-slow"></div>
//         <div className="absolute inset-2 border-2 border-transparent border-t-blue-500 rounded-full animate-spin-fast"></div>
//       </div>
//       <style>{`
//         .animate-spin-slow { animation: spin 3s linear infinite; }
//         .animate-spin-fast { animation: spin 1.5s linear infinite; }
//         @keyframes spin { to { transform: rotate(360deg); } }
//       `}</style>
//     </div>
//   );




  
  export default MiniLoading;
  
  