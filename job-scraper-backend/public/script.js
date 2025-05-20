document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  
  mobileMenuBtn.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    this.innerHTML = mainNav.classList.contains('active') ? 
      '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });
  
  // Back to Top Button
  const backToTop = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });
  
  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Search Functionality
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  
  searchBtn.addEventListener('click', function() {
    if (searchInput.value.trim() !== '') {
      alert('Searching for: ' + searchInput.value);
      // In a real implementation, you would redirect to search results page
      // or fetch results via AJAX
    }
  });
  
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && searchInput.value.trim() !== '') {
      alert('Searching for: ' + searchInput.value);
    }
  });
  
  // Subscription Form
  const subscribeForm = document.getElementById('subscribeForm');
  
  subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    if (email) {
      alert('Thank you for subscribing with: ' + email);
      this.reset();
    }
  });
  
  // Sample Data Loading (in a real app, this would come from an API)
  const sampleJobs = [
    {
      title: "Indian Post GDS 2025 Online Form",
      description: "ऑनलाइन फॉर्म भरने की प्रक्रिया और महत्वपूर्ण दस्तावेज़।",
      link: "#"
    },
    {
      title: "SBI Clerk Recruitment 2025",
      description: "State Bank of India clerk notification released for 5000+ posts.",
      link: "#"
    },
    {
      title: "RRB Group D Application Form",
      description: "Railway Recruitment Board Group D vacancies notification.",
      link: "#"
    }
  ];
  
  const sampleUpdates = [
    {
      title: "SSC MTS Result 2025 घोषित",
      description: "डाउनलाइन लिंक और मेरिट लिस्ट अब उपलब्ध।",
      link: "#"
    },
    {
      title: "UP Police SI Final Result",
      description: "Uttar Pradesh Police Sub Inspector final result declared.",
      link: "#"
    },
    {
      title: "IBPS PO Interview Dates",
      description: "Interview schedule for IBPS PO 2024-25 released.",
      link: "#"
    }
  ];
  
  const sampleForeignJobs = [
    {
      title: "UAE Security Guard Jobs 2025",
      description: "Visa + Flight Free, Apply via embassy verified agent.",
      link: "#"
    },
    {
      title: "Canada Work Permit Program",
      description: "Skilled worker program for Indians with PR pathway.",
      link: "#"
    },
    {
      title: "Australia Farm Worker Jobs",
      description: "2-year visa with good salary and accommodation.",
      link: "#"
    }
  ];
  
  const sampleSchemes = [
    {
      title: "PM किसान योजना – ₹2000 की किस्त कैसे पाएं?",
      description: "किस्त स्टेटस चेक करने और रजिस्ट्रेशन प्रक्रिया जानें।",
      link: "#"
    },
    {
      title: "Ayushman Bharat Yojana",
      description: "How to get your golden card for free health insurance.",
      link: "#"
    },
    {
      title: "PM Awas Yojana Gramin",
      description: "Rural housing scheme application process and status check.",
      link: "#"
    }
  ];
  
  const sampleUpcoming = [
    {
      title: "RRB NTPC 2025 – जल्द आ रही है भर्ती",
      description: "एग्जाम पैटर्न, सिलेबस, और तैयारी टिप्स जल्द ही।",
      link: "#"
    },
    {
      title: "UPSC CSE 2025 Notification",
      description: "Civil services exam notification expected next month.",
      link: "#"
    },
    {
      title: "SSC CHSL 2025 Expected Dates",
      description: "Combined higher secondary level exam schedule preview.",
      link: "#"
    }
  ];
  
  // Function to generate cards
  function generateCards(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = data.map(item => `
      <div class="card">
        <div class="card-content">
          <h4>${item.title}</h4>
          <p>${item.description}</p>
          <a href="${item.link}">Read More <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    `).join('');
  }
  
  // Load data into sections
  generateCards(sampleJobs, 'applyOnlineGrid');
  generateCards(sampleUpdates, 'updatesGrid');
  generateCards(sampleForeignJobs, 'foreignJobsGrid');
  generateCards(sampleSchemes, 'schemesGrid');
  generateCards(sampleUpcoming, 'upcomingGrid');
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
      }
    });
  });
});