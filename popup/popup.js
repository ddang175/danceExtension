const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const mirrorToggle = document.getElementById('mirrorToggle');

async function isContentScriptAvailable(tabId) {
    return new Promise((resolve) => {
        chrome.tabs.sendMessage(tabId, { action: 'PING' }, (response) => {
            if (chrome.runtime.lastError) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

async function ensureContentScript(tab) {
    const isAvailable = await isContentScriptAvailable(tab.id);
    
    if (!isAvailable) {
        try {
            if (tab.url.startsWith('chrome://') || 
                tab.url.startsWith('chrome-extension://') || 
                tab.url.startsWith('moz-extension://') ||
                tab.url.startsWith('about:')) {
                throw new Error('Cannot inject scripts into system pages');
            }
            
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
            });
            
            await new Promise(resolve => setTimeout(resolve, 100));
            
        } catch (error) {
            console.error('Failed to inject content script:', error);
            throw error;
        }
    }
}

speedSlider.addEventListener('input', async () => {
    const speed = parseFloat(speedSlider.value);
    speedValue.textContent = speed.toFixed(1) + 'x';
    
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        await ensureContentScript(tab);
        
        chrome.tabs.sendMessage(tab.id, {
            action: 'SET_VIDEO_SPEED',
            speed: speed
        }, (response) => {
            if (chrome.runtime.lastError) {
                console.error('Error setting speed:', chrome.runtime.lastError.message);
                showError('Failed to set video speed. Make sure you\'re on a video page.');
                return;
            }
            if (response && !response.success) {
                console.error('Speed setting failed:', response.error);
                showError(response.error);
            } else if (response) {
                console.log('Speed set:', response);
                showSuccess('Speed set to ' + speed + 'x');
            }
        });
    } catch (error) {
        console.error('Error setting speed:', error);
        showError('Cannot control videos on this page type.');
    }
});

mirrorToggle.addEventListener('change', async () => {
    const isMirrored = mirrorToggle.checked;
    
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        await ensureContentScript(tab);
        
        chrome.tabs.sendMessage(tab.id, {
            action: 'SET_VIDEO_MIRROR',
            mirror: isMirrored
        }, (response) => {
            if (chrome.runtime.lastError) {
                console.error('Error setting mirror:', chrome.runtime.lastError.message);
                showError('Failed to set video mirror. Make sure you\'re on a video page.');
                return;
            }
            if (response && !response.success) {
                console.error('Mirror setting failed:', response.error);
                showError(response.error);
            } else if (response) {
                console.log('Mirror set:', response);
                showSuccess('Mirror ' + (isMirrored ? 'enabled' : 'disabled'));
            }
        });
    } catch (error) {
        console.error('Error setting mirror:', error);
        showError('Cannot control videos on this page type.');
    }
});

document.getElementById('getTime').addEventListener('click', async () => {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        await ensureContentScript(tab);
        
        chrome.tabs.sendMessage(tab.id, {
            action: 'GET_VIDEO_TIME'
        }, (response) => {
            if (chrome.runtime.lastError) {
                console.error('Error getting time:', chrome.runtime.lastError.message);
                showError('Failed to get video time. Make sure you\'re on a video page.');
                return;
            }
            
            if (response && response.success) {
                console.log('Received from content script:', response);
                const minutes = Math.floor(response.time / 60);
                const seconds = Math.floor(response.time % 60);
                showSuccess(`Current time: ${minutes}:${seconds.toString().padStart(2, '0')}`);
            } else if (response) {
                console.error('Get time failed:', response.error);
                showError(response.error || 'Failed to get video time');
            }
        });
    } catch (error) {
        console.error('Error sending message:', error);
        showError('Cannot access videos on this page type.');
    }
});

function showError(message) {
    showMessage(message, 'error');
}

function showSuccess(message) {
    showMessage(message, 'success');
}

function showMessage(message, type) {
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        padding: 8px 12px;
        margin: 8px 0;
        border-radius: 4px;
        font-size: 12px;
        ${type === 'error' ? 
            'background-color: #fee; color: #c33; border: 1px solid #fcc;' : 
            'background-color: #efe; color: #363; border: 1px solid #cfc;'
        }
    `;
    
    document.body.insertBefore(messageEl, document.body.firstChild);
    
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
    }, 3000);
}