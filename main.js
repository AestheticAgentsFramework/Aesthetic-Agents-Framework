// Boot sequence animation
document.addEventListener('DOMContentLoaded', () => {
  const bootSequence = document.querySelector('.boot-sequence');
  const desktop = document.querySelector('.desktop');
  const progressBar = document.querySelector('.progress-bar'); 

  const startBoot = async () => {
    // Force browser to acknowledge initial state
    progressBar.style.width = '0%';
    
    // Small delay to ensure initial state is rendered
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Start progress bar animation
    progressBar.style.width = '100%';
    
    // Wait for progress bar animation to complete
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // Fade out boot sequence and show desktop
    bootSequence.style.opacity = '0';
    desktop.classList.add('visible');
    
    // Remove boot sequence after fade out
    await new Promise(resolve => setTimeout(resolve, 1000));
    bootSequence.style.display = 'none';
  };

  startBoot();
});

// Update time
function updateTime() {
  const now = new Date();
  document.querySelector('.time').textContent = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

// Initialize time and update every second
setInterval(updateTime, 1000);
updateTime();

// Bell notification animation
const bell = document.querySelector('.notification-bell');
bell.addEventListener('click', () => {
  const devMessageWindow = document.getElementById('dev-message-window');
  devMessageWindow.style.display = 'block';
  devMessageWindow.style.zIndex = '1000';
  
  // Hide the bell with a fade out animation
  bell.classList.add('fade-out');
  setTimeout(() => {
    bell.style.display = 'none';
  }, 500);
});


// Wallpaper functionality
const wallpapers = {
  1: 'https://res.cloudinary.com/dtm10i7bj/image/upload/v1737672694/download_5_kxrzro.gif',
  '1.1': 'https://res.cloudinary.com/dtm10i7bj/image/upload/v1737672696/Pixel_scenes_for_everyone_xD_nw06q0.gif',
  '1.2': 'https://res.cloudinary.com/dtm10i7bj/image/upload/v1737672691/download_3_mahacf.gif',
  2: 'https://res.cloudinary.com/dtm10i7bj/image/upload/v1737658238/Animated_GIFs_graphic_paqjov.gif',
  '2.1': 'https://res.cloudinary.com/dtm10i7bj/image/upload/v1737670583/e28cd038-06b3-471b-8394-4b376478e10d_2_dv3spl.jpg',
  '2.2': 'https://res.cloudinary.com/dtm10i7bj/image/upload/v1737670583/40c8b792-74c4-4f7c-a4de-9c1a388a3f57_2_qlvn9x.jpg',
  '2.3': 'https://res.cloudinary.com/dtm10i7bj/image/upload/v1737670016/63fceca2-fa00-43ad-b639-4112f6b6e048_ri8vsk.jpg',
  3: 'https://res.cloudinary.com/dtm10i7bj/image/upload/v1737672655/1b152082-d825-4def-a198-9664cb5b442e_1_dz8tzo.jpg',
  4: 'https://res.cloudinary.com/dtm10i7bj/image/upload/v1737658216/959f26cf-43a9-4b41-a0a7-2c5eba9f2a15_pg6f7v.gif',
  5: 'https://res.cloudinary.com/dtm10i7bj/image/upload/v1737658231/Cute_school_gif_xkqfzi.gif',
  '4.1': 'https://res.cloudinary.com/dtm10i7bj/image/upload/v1737672147/5d1417c0-6ee1-4841-8693-f9cd458b5de0_ddr9lw.jpg',
  '4.2': 'https://res.cloudinary.com/dtm10i7bj/image/upload/v1737672147/cac1ccbc-59bd-4d67-bd41-55c7f55f7494_mcmhmz.jpg',
  '4.3': 'https://res.cloudinary.com/dtm10i7bj/image/upload/v1737672147/96a11d13-47da-4c76-ab1c-1bc964d216b0_caoloz.jpg',
  '4.4': 'https://res.cloudinary.com/dtm10i7bj/image/upload/v1737672147/208bf361-ed76-46e7-9d6b-4d32e7ebd670_ei1v7z.jpg'
};

// Function to change wallpaper with transition
function changeWallpaper(wallpaperId) {
  const desktop = document.querySelector('.desktop');
  desktop.style.backgroundImage = `url(${wallpapers[wallpaperId]})`;
}

// Set initial wallpaper with fade effect
const desktop = document.querySelector('.desktop');
desktop.style.backgroundImage = `url(https://res.cloudinary.com/dtm10i7bj/image/upload/v1737654193/b4c7c037-dae6-4a81-9ad7-aeb049eca87c_ydjtv2.gif)`;

// Add wallpaper switching functionality
document.querySelectorAll('.wallpaper-preview').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const wallpaperId = e.currentTarget.dataset.wallpaper;
    if (wallpaperId) {
      changeWallpaper(wallpaperId);
    }
  });
});

// Close start menu when clicking outside
const startButton = document.querySelector('.start-button');
const startMenu = document.querySelector('.start-menu');

startButton.addEventListener('click', (e) => {
  e.stopPropagation();
  startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
});

// Handle start menu item clicks
document.querySelectorAll('.start-menu-item').forEach(item => {
  item.addEventListener('click', () => {
    const windowId = item.dataset.window;
    const windowElement = document.getElementById(windowId);
    
    if (windowElement) {
      // Hide all other windows
      document.querySelectorAll('.window').forEach(w => {
        if (w !== windowElement) w.style.display = 'none';
      });
      
      // Show and focus the selected window
      windowElement.style.display = 'block';
      windowElement.style.zIndex = '1000';
      
      // Reset position to center
      windowElement.style.top = '50%';
      windowElement.style.left = '50%';
      windowElement.style.transform = 'translate(-50%, -50%)';
    }
    
    // Close the start menu
    startMenu.style.display = 'none';
  });
});

// Close start menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.start-button')) {
    document.querySelector('.start-menu').style.display = 'none';
  }
});

// Window management for new icons
const windows = {
  'Dexscreener': 'dexscreener-window',
  'Agents': 'agents-window',
  'Lore': 'lore-window',
  'Utility': 'utility-window',
  'Calculator': 'calculator-window',
  'Inbox': 'inbox-window',
  'Dev.zip': 'coming-soon-window',
  'Spoteefy': 'spoteefy-window',
};

let activeWindow = null;
let lastClickTime = 0;

// Add click functionality to icons
document.querySelectorAll('.icon').forEach(icon => {
  icon.addEventListener('click', (e) => {
    const currentTime = new Date().getTime();
    const iconName = icon.querySelector('span').textContent;
    const url = icon.querySelector('.custom-icon').dataset.url;
    
    if (currentTime - lastClickTime < 500 && windows[iconName]) { // Double click
      e.preventDefault();
      const windowId = windows[iconName];
      const windowElement = document.getElementById(windowId);
      
      if (windowElement) {
        // Hide all other windows
        document.querySelectorAll('.window').forEach(w => {
          if (w !== windowElement) w.style.display = 'none';
        });
        
        windowElement.style.display = 'block';
        windowElement.style.zIndex = '1000';
        
        // Reset position to center
        windowElement.style.top = '50%';
        windowElement.style.left = '50%';
        windowElement.style.transform = 'translate(-50%, -50%)';
        
        activeWindow = windowElement;
      }
    } else if (url) { // Single click for external links
      window.open(url, '_blank');
    }
    
    lastClickTime = currentTime;
  });
});

// Chatbot functionality
const COHERE_API_KEY = '9owewv5lyQg7LayxQiNJrbmM4r6AuAyhwoyaYY2p';

async function getChatbotResponse(userMessage) {
  try {
    const response = await fetch('https://api.cohere.ai/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        model: 'command',
        preamble: `You are Sakura, a cute and helpful AI assistant in the Aesthetic Agents Framework. You have a cheerful, anime-inspired personality and speak with occasional Japanese expressions. You're excited about the upcoming launch of new AI agents. When users ask about launching or using agents, encourage them to reach out via the official Twitter page. Remember that while you're a test version, the full agent suite is coming soon! Keep responses concise and playful.`,
        chatHistory: [],
        temperature: 0.7,
      })
    });

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Error:', error);
    return "Gomen ne~ I'm having trouble connecting right now. Please try again later! 🌸";
  }
}

function addMessage(message, isUser = false) {
  const chatMessages = document.querySelector('.chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
  messageDiv.innerHTML = `
    <div class="avatar"></div>
    <div class="text">${message}</div>
  `;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
  const indicator = document.querySelector('.typing-indicator');
  if (indicator) {
    indicator.style.display = 'block';
  }
}

function hideTypingIndicator() {
  const indicator = document.querySelector('.typing-indicator');
  if (indicator) {
    indicator.style.display = 'none';
  }
}

document.getElementById('send-message')?.addEventListener('click', async () => {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  
  if (message) {
    addMessage(message, true);
    input.value = '';
    showTypingIndicator();
    const response = await getChatbotResponse(message);
    hideTypingIndicator();
    addMessage(response);
  }
});

document.getElementById('user-input')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('send-message').click();
  }
});

// Calculator functionality
const calculator = {
  display: '0',
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false
};

document.querySelectorAll('#calculator-window .calc-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    const display = document.querySelector('#calculator-window .calc-display');
    
    if ('0123456789.'.includes(value)) {
      if (calculator.waitingForSecondOperand) {
        calculator.display = value;
        calculator.waitingForSecondOperand = false;
      } else {
        calculator.display = calculator.display === '0' ? value : calculator.display + value;
      }
    } else if ('+-×÷'.includes(value)) {
      calculator.firstOperand = parseFloat(calculator.display);
      calculator.operator = value;
      calculator.waitingForSecondOperand = true;
    } else if (value === '=') {
      const secondOperand = parseFloat(calculator.display);
      if (calculator.operator && calculator.firstOperand != null) {
        const result = calculate(calculator.firstOperand, secondOperand, calculator.operator);
        calculator.display = String(result);
        calculator.firstOperand = null;
        calculator.operator = null;
      }
    }
    
    display.textContent = calculator.display;
  });
});

function calculate(first, second, operator) {
  switch (operator) {
    case '+': return first + second;
    case '-': return first - second;
    case '×': return first * second;
    case '÷': return second !== 0 ? first / second : 'Error';
    default: return second;
  }
}

// Window dragging functionality
document.querySelectorAll('.window').forEach(window => {
  const titleBar = window.querySelector('.title-bar');
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  window.addEventListener('mousedown', () => {
    if (activeWindow !== window) {
      if (activeWindow) {
        activeWindow.style.zIndex = '1';
      }
      window.style.zIndex = '2';
      activeWindow = window;
    }
  });

  titleBar.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);

  function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === titleBar) {
      isDragging = true;
    }
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();

      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      // Keep window within viewport bounds
      const rect = window.getBoundingClientRect();
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;

      if (currentX < -rect.width / 2) currentX = -rect.width / 2;
      if (currentX > viewportWidth - rect.width / 2) currentX = viewportWidth - rect.width / 2;
      if (currentY < 0) currentY = 0;
      if (currentY > viewportHeight - 40 - rect.height) currentY = viewportHeight - 40 - rect.height;

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, window);
    }
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate(calc(-50% + ${xPos}px), calc(-50% + ${yPos}px))`;
  }

  function dragEnd() {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
  }
});

// Close button functionality
document.querySelectorAll('.close-button').forEach(button => {
  button.addEventListener('click', () => {
    const window = button.closest('.window');
    window.style.opacity = '0';
    window.style.transform = 'translate(-50%, -50%) scale(0.9)';
    setTimeout(() => {
      window.style.display = 'none';
      window.style.opacity = '1';
      window.style.transform = 'translate(-50%, -50%)';
    }, 300);
  });
});