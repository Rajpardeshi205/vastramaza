export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  };
  
  export const cardVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.8,
      rotateY: -25,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };
  
  export const imageVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, 3, -3, 0],
      filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"],
      transition: {
        scale: { duration: 0.5, ease: "easeOut" },
        rotate: { duration: 0.8, ease: "easeInOut" },
        filter: { duration: 0.6, ease: "easeInOut" },
      },
    },
  };
  
  export const priceVariants = {
    hover: {
      scale: [1, 1.3, 1],
      color: ["#ef4444", "#dc2626", "#ef4444"],
      textShadow: [
        "0px 0px 0px rgba(239, 68, 68, 0)",
        "0px 0px 8px rgba(239, 68, 68, 0.6)",
        "0px 0px 0px rgba(239, 68, 68, 0)",
      ],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };
  
  export const badgeVariants = {
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      backgroundColor: ["#1e3a8a", "#7c3aed", "#1e3a8a"],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };
  
  export const featuredBadgeVariants = {
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 2, -2, 0],
      boxShadow: [
        "0 0 0 rgba(251, 191, 36, 0)",
        "0 0 20px rgba(251, 191, 36, 0.6)",
        "0 0 0 rgba(251, 191, 36, 0)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
  
  export  const categoryBadgeVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: ["#1e40af", "#7c3aed", "#1e40af"],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };


  export const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  export const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };


  

  export const filterSectionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  export const mobileFilterVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
      },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  export const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };