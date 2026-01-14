/**
 * Utah's Elevated Real Estate
 * Feedback Widget for Prototype Review
 */

(function() {
  'use strict';

  // Configuration
  const STORAGE_KEY = 'utahs_elevated_onboarding_complete';
  const FEEDBACK_STORAGE_KEY = 'utahs_elevated_feedback_log';
  
  // Widget State
  let isOpen = false;
  let hasCompletedOnboarding = false;
  let widgetContainer = null;

  // ----------------------------------------
  // Create Widget Container
  // ----------------------------------------
  function createWidgetHTML() {
    const container = document.createElement('div');
    container.id = 'feedback-widget';
    container.className = 'feedback-widget';
    
    container.innerHTML = `
      <!-- Floating Button -->
      <button class="feedback-widget__trigger" aria-label="Open feedback" title="Submit Feedback">
        <svg class="feedback-widget__icon-chat" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <svg class="feedback-widget__icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        <span class="feedback-widget__pulse"></span>
      </button>

      <!-- Modal Panel -->
      <div class="feedback-widget__panel" aria-hidden="true">
        <!-- Onboarding View -->
        <div class="feedback-widget__view feedback-widget__view--onboarding" data-view="onboarding">
          <div class="feedback-widget__header">
            <div class="feedback-widget__header-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <h3 class="feedback-widget__title">Welcome to Your New Website!</h3>
          </div>
          <div class="feedback-widget__content">
            <p class="feedback-widget__intro">
              This is the <strong>concept prototype</strong> for Utah's Elevated Real Estate Group. 
              We've designed this site to showcase your brand with elegance and sophistication.
            </p>
            <div class="feedback-widget__features">
              <div class="feedback-widget__feature">
                <span class="feedback-widget__feature-icon">🎨</span>
                <span>Explore the design, colors, and layout</span>
              </div>
              <div class="feedback-widget__feature">
                <span class="feedback-widget__feature-icon">📱</span>
                <span>Test on different screen sizes</span>
              </div>
              <div class="feedback-widget__feature">
                <span class="feedback-widget__feature-icon">💬</span>
                <span>Click this button anytime to request changes</span>
              </div>
            </div>
            <p class="feedback-widget__note">
              <strong>To submit feedback:</strong> Re-open this panel anytime using the button 
              in the bottom corner and tell us exactly what you'd like changed!
            </p>
          </div>
          <button class="feedback-widget__btn feedback-widget__btn--primary" data-action="start-exploring">
            Got it, Let's Explore!
          </button>
        </div>

        <!-- Feedback Form View -->
        <div class="feedback-widget__view feedback-widget__view--feedback" data-view="feedback" style="display: none;">
          <div class="feedback-widget__header">
            <h3 class="feedback-widget__title">Request a Change</h3>
            <p class="feedback-widget__subtitle">Tell us what you'd like modified</p>
          </div>
          <form class="feedback-widget__form" id="feedback-form">
            <div class="feedback-widget__form-group">
              <label for="feedback-area" class="feedback-widget__label">Area of the Site</label>
              <select id="feedback-area" name="area" class="feedback-widget__select" required>
                <option value="">Select an area...</option>
                <option value="header">Header / Navigation</option>
                <option value="hero">Hero Section (Main Banner)</option>
                <option value="about">About / Team Section</option>
                <option value="approach">Our Approach Section</option>
                <option value="listings">Properties / Listings</option>
                <option value="testimonials">Testimonials</option>
                <option value="contact">Contact Section</option>
                <option value="footer">Footer</option>
                <option value="colors">Colors / Accent Color</option>
                <option value="fonts">Fonts / Typography</option>
                <option value="images">Images / Photos</option>
                <option value="overall">Overall Design</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="feedback-widget__form-group">
              <label for="feedback-type" class="feedback-widget__label">Type of Change</label>
              <select id="feedback-type" name="type" class="feedback-widget__select" required>
                <option value="">Select type...</option>
                <option value="color">Change Color</option>
                <option value="image">Replace Image</option>
                <option value="text">Update Text / Content</option>
                <option value="layout">Change Layout</option>
                <option value="add">Add Something</option>
                <option value="remove">Remove Something</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="feedback-widget__form-group">
              <label for="feedback-details" class="feedback-widget__label">Details</label>
              <textarea 
                id="feedback-details" 
                name="details" 
                class="feedback-widget__textarea" 
                rows="4" 
                placeholder="Please describe the change you'd like. Be as specific as possible (e.g., 'Change the accent color from copper to navy blue' or 'Replace the hero image with our team photo')"
                required
              ></textarea>
            </div>
            <div class="feedback-widget__form-group">
              <label for="feedback-priority" class="feedback-widget__label">Priority</label>
              <div class="feedback-widget__radio-group">
                <label class="feedback-widget__radio">
                  <input type="radio" name="priority" value="low" checked>
                  <span class="feedback-widget__radio-label">Nice to have</span>
                </label>
                <label class="feedback-widget__radio">
                  <input type="radio" name="priority" value="medium">
                  <span class="feedback-widget__radio-label">Important</span>
                </label>
                <label class="feedback-widget__radio">
                  <input type="radio" name="priority" value="high">
                  <span class="feedback-widget__radio-label">Critical</span>
                </label>
              </div>
            </div>
            <button type="submit" class="feedback-widget__btn feedback-widget__btn--primary">
              Submit Change Request
            </button>
          </form>
        </div>

        <!-- Success View -->
        <div class="feedback-widget__view feedback-widget__view--success" data-view="success" style="display: none;">
          <div class="feedback-widget__success-content">
            <div class="feedback-widget__success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 class="feedback-widget__title">Thank You!</h3>
            <p class="feedback-widget__success-text">
              Your change request has been logged. We'll review it and make the updates for you.
            </p>
            <button class="feedback-widget__btn feedback-widget__btn--secondary" data-action="submit-another">
              Submit Another Request
            </button>
            <button class="feedback-widget__btn feedback-widget__btn--ghost" data-action="close">
              Close
            </button>
          </div>
        </div>
      </div>
    `;
    
    return container;
  }

  // ----------------------------------------
  // Insert Widget Styles
  // ----------------------------------------
  function insertWidgetStyles() {
    const styles = document.createElement('style');
    styles.id = 'feedback-widget-styles';
    styles.textContent = `
      /* Feedback Widget Container */
      .feedback-widget {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 10000;
        font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      /* Floating Trigger Button */
      .feedback-widget__trigger {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #B87333 0%, #8B5A2B 100%);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(184, 115, 51, 0.4), 0 2px 8px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
        position: relative;
        overflow: visible;
      }

      .feedback-widget__trigger:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 28px rgba(184, 115, 51, 0.5), 0 4px 12px rgba(0,0,0,0.2);
      }

      .feedback-widget__trigger svg {
        color: white;
        transition: all 0.3s ease;
      }

      .feedback-widget__icon-close {
        display: none;
      }

      .feedback-widget.is-open .feedback-widget__icon-chat {
        display: none;
      }

      .feedback-widget.is-open .feedback-widget__icon-close {
        display: block;
      }

      /* Pulse Animation for Attention */
      .feedback-widget__pulse {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: rgba(184, 115, 51, 0.4);
        animation: pulse-ring 2s ease-out infinite;
      }

      .feedback-widget.has-seen .feedback-widget__pulse {
        display: none;
      }

      @keyframes pulse-ring {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        100% {
          transform: scale(1.6);
          opacity: 0;
        }
      }

      /* Panel */
      .feedback-widget__panel {
        position: absolute;
        bottom: 70px;
        right: 0;
        width: 380px;
        max-height: 520px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 50px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05);
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px) scale(0.95);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .feedback-widget.is-open .feedback-widget__panel {
        opacity: 1;
        visibility: visible;
        transform: translateY(0) scale(1);
      }

      /* Views */
      .feedback-widget__view {
        padding: 24px;
        max-height: 500px;
        overflow-y: auto;
      }

      /* Header */
      .feedback-widget__header {
        text-align: center;
        margin-bottom: 20px;
      }

      .feedback-widget__header-icon {
        width: 56px;
        height: 56px;
        margin: 0 auto 16px;
        background: linear-gradient(135deg, rgba(184, 115, 51, 0.1) 0%, rgba(184, 115, 51, 0.2) 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .feedback-widget__header-icon svg {
        color: #B87333;
      }

      .feedback-widget__title {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1.35rem;
        font-weight: 600;
        color: #2D2D2D;
        margin: 0 0 8px;
        line-height: 1.3;
      }

      .feedback-widget__subtitle {
        font-size: 0.875rem;
        color: #6B6B6B;
        margin: 0;
      }

      /* Content */
      .feedback-widget__content {
        margin-bottom: 20px;
      }

      .feedback-widget__intro {
        font-size: 0.95rem;
        color: #444;
        line-height: 1.6;
        margin: 0 0 16px;
      }

      .feedback-widget__features {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 16px;
        padding: 16px;
        background: #FAFAF8;
        border-radius: 10px;
      }

      .feedback-widget__feature {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 0.9rem;
        color: #444;
      }

      .feedback-widget__feature-icon {
        font-size: 1.2rem;
      }

      .feedback-widget__note {
        font-size: 0.85rem;
        color: #6B6B6B;
        line-height: 1.6;
        padding: 12px;
        background: linear-gradient(135deg, rgba(184, 115, 51, 0.05) 0%, rgba(184, 115, 51, 0.1) 100%);
        border-radius: 8px;
        border-left: 3px solid #B87333;
        margin: 0;
      }

      /* Buttons */
      .feedback-widget__btn {
        width: 100%;
        padding: 14px 20px;
        border-radius: 8px;
        font-family: inherit;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
      }

      .feedback-widget__btn--primary {
        background: linear-gradient(135deg, #B87333 0%, #8B5A2B 100%);
        color: white;
      }

      .feedback-widget__btn--primary:hover {
        box-shadow: 0 4px 15px rgba(184, 115, 51, 0.4);
        transform: translateY(-1px);
      }

      .feedback-widget__btn--secondary {
        background: #2D2D2D;
        color: white;
        margin-bottom: 10px;
      }

      .feedback-widget__btn--secondary:hover {
        background: #444;
      }

      .feedback-widget__btn--ghost {
        background: transparent;
        color: #6B6B6B;
        border: 1px solid #e0e0e0;
      }

      .feedback-widget__btn--ghost:hover {
        background: #f5f5f5;
      }

      /* Form Styles */
      .feedback-widget__form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .feedback-widget__form-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .feedback-widget__label {
        font-size: 0.8rem;
        font-weight: 600;
        color: #2D2D2D;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .feedback-widget__select,
      .feedback-widget__textarea {
        width: 100%;
        padding: 12px 14px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        font-family: inherit;
        font-size: 0.95rem;
        color: #2D2D2D;
        background: white;
        transition: all 0.2s ease;
      }

      .feedback-widget__select:focus,
      .feedback-widget__textarea:focus {
        outline: none;
        border-color: #B87333;
        box-shadow: 0 0 0 3px rgba(184, 115, 51, 0.1);
      }

      .feedback-widget__textarea {
        resize: vertical;
        min-height: 100px;
      }

      .feedback-widget__radio-group {
        display: flex;
        gap: 8px;
      }

      .feedback-widget__radio {
        flex: 1;
        cursor: pointer;
      }

      .feedback-widget__radio input {
        display: none;
      }

      .feedback-widget__radio-label {
        display: block;
        padding: 10px 12px;
        text-align: center;
        font-size: 0.8rem;
        font-weight: 500;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        transition: all 0.2s ease;
      }

      .feedback-widget__radio input:checked + .feedback-widget__radio-label {
        background: linear-gradient(135deg, rgba(184, 115, 51, 0.1) 0%, rgba(184, 115, 51, 0.2) 100%);
        border-color: #B87333;
        color: #8B5A2B;
      }

      .feedback-widget__radio:hover .feedback-widget__radio-label {
        border-color: #B87333;
      }

      /* Success View */
      .feedback-widget__success-content {
        text-align: center;
        padding: 20px 0;
      }

      .feedback-widget__success-icon {
        width: 72px;
        height: 72px;
        margin: 0 auto 20px;
        background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .feedback-widget__success-icon svg {
        color: #28a745;
      }

      .feedback-widget__success-text {
        font-size: 0.95rem;
        color: #6B6B6B;
        line-height: 1.6;
        margin: 0 0 24px;
      }

      /* Responsive */
      @media (max-width: 480px) {
        .feedback-widget {
          bottom: 16px;
          right: 16px;
        }

        .feedback-widget__trigger {
          width: 54px;
          height: 54px;
        }

        .feedback-widget__panel {
          width: calc(100vw - 32px);
          right: 0;
          bottom: 64px;
          max-height: 70vh;
        }

        .feedback-widget__view {
          padding: 20px;
        }

        .feedback-widget__radio-group {
          flex-direction: column;
        }
      }
    `;
    
    document.head.appendChild(styles);
  }

  // ----------------------------------------
  // Widget Functionality
  // ----------------------------------------
  function initWidget() {
    // Check if onboarding has been completed
    hasCompletedOnboarding = localStorage.getItem(STORAGE_KEY) === 'true';
    
    // Insert styles
    insertWidgetStyles();
    
    // Create and insert widget
    widgetContainer = createWidgetHTML();
    document.body.appendChild(widgetContainer);
    
    // Get elements
    const trigger = widgetContainer.querySelector('.feedback-widget__trigger');
    const panel = widgetContainer.querySelector('.feedback-widget__panel');
    const views = {
      onboarding: widgetContainer.querySelector('[data-view="onboarding"]'),
      feedback: widgetContainer.querySelector('[data-view="feedback"]'),
      success: widgetContainer.querySelector('[data-view="success"]')
    };
    
    // Set initial view
    if (hasCompletedOnboarding) {
      widgetContainer.classList.add('has-seen');
      showView('feedback');
    } else {
      // Auto-open for first-time visitors after a short delay
      setTimeout(() => {
        openWidget();
      }, 1500);
    }
    
    // Trigger click handler
    trigger.addEventListener('click', () => {
      if (isOpen) {
        closeWidget();
      } else {
        openWidget();
      }
    });
    
    // Close on clicking outside
    document.addEventListener('click', (e) => {
      if (isOpen && !widgetContainer.contains(e.target)) {
        closeWidget();
      }
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeWidget();
      }
    });
    
    // Button actions
    widgetContainer.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      if (!action) return;
      
      switch (action) {
        case 'start-exploring':
          completeOnboarding();
          closeWidget();
          break;
        case 'submit-another':
          showView('feedback');
          break;
        case 'close':
          closeWidget();
          break;
      }
    });
    
    // Form submission
    const feedbackForm = widgetContainer.querySelector('#feedback-form');
    feedbackForm.addEventListener('submit', handleFormSubmit);
  }
  
  function showView(viewName) {
    const views = widgetContainer.querySelectorAll('.feedback-widget__view');
    views.forEach(view => {
      view.style.display = view.dataset.view === viewName ? 'block' : 'none';
    });
  }
  
  function openWidget() {
    isOpen = true;
    widgetContainer.classList.add('is-open');
    widgetContainer.querySelector('.feedback-widget__panel').setAttribute('aria-hidden', 'false');
    
    // Show appropriate view
    if (!hasCompletedOnboarding) {
      showView('onboarding');
    } else {
      showView('feedback');
    }
  }
  
  function closeWidget() {
    isOpen = false;
    widgetContainer.classList.remove('is-open');
    widgetContainer.querySelector('.feedback-widget__panel').setAttribute('aria-hidden', 'true');
  }
  
  function completeOnboarding() {
    hasCompletedOnboarding = true;
    localStorage.setItem(STORAGE_KEY, 'true');
    widgetContainer.classList.add('has-seen');
    showView('feedback');
  }

  // ----------------------------------------
  // Form Submission & Logging
  // ----------------------------------------
  async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Add metadata
    const feedbackEntry = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      area: data.area,
      type: data.type,
      details: data.details,
      priority: data.priority,
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      screenSize: `${window.innerWidth}x${window.innerHeight}`
    };
    
    // Disable form during submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    try {
      // Try to send to API first
      const apiSuccess = await sendToAPI(feedbackEntry);
      
      // Also store locally as backup
      storeLocally(feedbackEntry);
      
      // Log to console for debugging (you can see this in browser dev tools)
      console.log('📝 Feedback Submitted:', feedbackEntry);
      console.group('📋 All Feedback Entries');
      console.log(getLocalFeedback());
      console.groupEnd();
      
      // Show success
      showView('success');
      form.reset();
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Still store locally even if API fails
      storeLocally(feedbackEntry);
      showView('success');
      form.reset();
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }
  
  async function sendToAPI(data) {
    // Try multiple methods
    
    // Method 1: Vercel Serverless Function (if deployed)
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        return true;
      }
    } catch (e) {
      console.log('API not available, using local storage fallback');
    }
    
    // Method 2: Free webhook service fallback (webhook.site for testing)
    // You can replace this URL with your own webhook endpoint
    try {
      // Uncomment and replace with your webhook URL if you have one:
      // await fetch('https://your-webhook-url.com', {
      //   method: 'POST',
      //   mode: 'no-cors',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
    } catch (e) {
      // Webhook not configured
    }
    
    return false;
  }
  
  function storeLocally(entry) {
    try {
      const existing = JSON.parse(localStorage.getItem(FEEDBACK_STORAGE_KEY) || '[]');
      existing.push(entry);
      localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(existing));
    } catch (e) {
      console.error('Error storing feedback locally:', e);
    }
  }
  
  function getLocalFeedback() {
    try {
      return JSON.parse(localStorage.getItem(FEEDBACK_STORAGE_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }
  
  function generateId() {
    return 'fb_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  // ----------------------------------------
  // Export for debugging
  // ----------------------------------------
  window.UtahsElevatedFeedback = {
    getFeedback: getLocalFeedback,
    clearFeedback: () => localStorage.removeItem(FEEDBACK_STORAGE_KEY),
    resetOnboarding: () => {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    },
    exportFeedback: () => {
      const data = getLocalFeedback();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `utahs-elevated-feedback-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // ----------------------------------------
  // Initialize
  // ----------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }

})();
