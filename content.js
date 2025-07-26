(function() {
    function waitForPlayerControls(callback) {
        const interval = setInterval(() => {
            const controls = document.querySelector('.ytp-right-controls');
            if (controls) {
                clearInterval(interval);
                callback(controls);
            }
        }, 500);
    }

    function injectDanceButton(controls) {
        if (document.getElementById('yt-dance-btn')) return;

        const btn = document.createElement('button');
        btn.id = 'yt-dance-btn';
        btn.className = 'ytp-button';
        btn.title = 'Dance Controls';
        btn.innerHTML = '<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1080 1080" style="fill:white; width: 28px; height: 28px; display: block; margin: auto;"><defs><style>.st0{fill:#ffffff;}</style></defs><path class="st0" d="M33.24,265.13,33.24,802.57,33.24,802.57h162.29c9.8,0,19.63-.19,29.35-1.46,168.26-22.04,247.57-215.7,200.08-369.74-39.05-114.83-116.21-166.18-232.38-166.24H33.24v-122.66s20.16.58,47.65.58h99.31c109.56,0,209.18,31.58,286.82,109.21,77.62,77.63,110.43,178.47,110.43,288.04s-29.86,208.19-107.48,285.82c-77.63,77.63-180.2,111.42-289.76,111.42H33.24v-134.96Z"/><path class="st0" d="M909.29,476.64l-47.38,122.88c-45.8-24.83-89.42-10.84-89.42-10.84-14.95,2.1-29.3,8.07-41.34,17.19-31.15,23.61-46.11,53.83-44.88,90.66.84,25.24,10.96,49.26,28.32,67.61,21.02,22.21,46.57,33.31,76.68,33.31s53.7-10.27,74.25-30.82l29.24-24.06c13.99-9.1,28.4-13.17,46.37-13.06,35,.22,56.52,20.08,70.13,59.94,11.02,32.26,21.52,80.44,21.52,80.44l13.98,67.65h-131.33s-4.04-26.38-6.14-29.42c-47.03,26.17-101.34,34.88-162.92,26.14-34.12-4.84-66.73-18.36-94.31-39.04-78.14-58.59-113.06-135.1-104.76-229.53,4.11-46.8,22.82-91.65,53.09-127.57,51.06-60.58,114.68-90.89,190.87-90.89,43.43,0,82.77,9.81,118.02,29.42"/><circle class="st0" cx="674.55" cy="311.84" r="97.12"/></svg>';
        btn.style.marginLeft = '8px';
        controls.insertBefore(btn, controls.firstChild);

        const card = document.createElement('div');
        card.id = 'yt-dance-card';
        card.style.display = 'none';
        const speedLabels = [
            '0.1x','0.2x','0.3x','0.4x','0.5x','0.6x','0.7x','0.8x','0.9x','1.0x'
        ];
        card.innerHTML = `
          <div class="yt-dance-card-inner">
            <div class="yt-dance-card-title-row" style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center;">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080.73 323.8" width="60" height="32">
                  <defs>
                    <style>
                      .cls-1 {
                        fill: #ffffff;
                      }
                    </style>
                  </defs>
                  <path class="cls-1" d="M0,49.95,0,268.83,0,268.83h66.09c3.99,0,8-.08,11.95-.6,68.52-8.98,100.82-87.84,81.48-150.58-15.9-46.76-47.33-67.68-94.64-67.7H0V0s8.21.24,19.4.24h40.45c44.62,0,85.19,12.86,116.81,44.48,31.61,31.62,44.97,72.68,44.97,117.31s-12.16,84.78-43.77,116.4c-31.62,31.62-73.39,45.38-118,45.38H0v-54.96Z"/>
                  <path class="cls-1" d="M337.48,186.13c-18.65-10.11-36.42-4.42-36.42-4.42-6.09.86-11.93,3.29-16.83,7-12.69,9.62-18.78,21.92-18.28,36.92.34,10.28,4.46,20.06,11.53,27.53,8.56,9.05,18.97,13.57,31.23,13.57s21.87-4.18,30.24-12.55l11.91-9.8c5.7-3.7,11.56-5.36,18.89-5.32,14.25.09,23.02,8.18,28.56,24.41,4.49,13.14,8.76,32.76,8.76,32.76l5.69,27.55h-53.48s-1.65-10.74-2.5-11.98c-19.15,10.66-41.27,14.2-66.35,10.64-13.9-1.97-27.18-7.48-38.41-15.9-31.82-23.86-46.04-55.02-42.66-93.48,1.67-19.06,9.29-37.32,21.62-51.95,20.79-24.67,46.7-37.02,77.73-37.02,17.69,0,33.71,4,48.06,11.98M356.78,136.09"/>
                  <circle class="cls-1" cx="261.18" cy="68.98" r="39.55"/>
                  <g>
                    <path class="cls-1" d="M412.76,323.79v-166.38c0-7.67,0-27.73,0-27.73h27.58c7.54,0,13.97,2.64,19.31,7.9,10.84-5.27,22.8-7.9,35.85-7.9,22.9,0,42.41,8.11,58.55,24.33,16.14,16.22,24.2,35.84,24.2,58.86v110.92M440.34,323.8,523.09,323.79v-110.92c0-7.68-2.69-14.21-8.07-19.62-5.38-5.41-11.88-8.11-19.51-8.11s-14.14,2.7-19.51,8.11c-5.38,5.41-8.07,11.95-8.07,19.62v110.92M550.68,323.8"/>
                    <path class="cls-1" d="M749.48,204.76,704.04,197.35c-8.09-8.13-17.84-12.2-29.24-12.2-12.55,0-23.09,4.93-31.62,14.77-5.62,6.49-9.04,14.75-9.63,23.31-.89,12.98,3.11,23.95,12.01,32.9,8.09,8.14,17.84,12.2,29.24,12.2s24.37-4.65,30.62-11.34c7.73-8.28,10.05-11.99,10.05-11.99l37.92,36.11c-1.56,2.22-7.93,11.86-10.32,14.26-18.85,18.95-41.6,28.42-68.27,28.42s-49.42-9.48-68.27-28.42c-18.85-18.95-28.27-41.83-28.27-68.63s9.42-49.68,28.27-68.63c18.85-18.95,41.6-28.42,68.27-28.42s49.42,9.48,68.27,28.42c2.39,2.41,4.32,4.67,5.79,6.79.18.19.42.37.69.56l-39.03,39.24M749.48,248.71"/>
                    <path class="cls-1" d="M875.04,323.8h-41.38c-26.67,0-49.42-9.48-68.27-28.42-18.85-18.95-28.27-41.83-28.27-68.63s9.42-49.68,28.27-68.63c18.85-18.95,41.6-28.42,68.27-28.42s49.42,9.48,68.27,28.42c18.85,18.95,28.27,41.83,28.27,68.63,0,7.68-2.69,14.21-8.07,19.62-5.38,5.41-11.88,8.11-19.51,8.11h-99.71c.46.55.97,1.11,1.52,1.66,8.09,8.14,17.84,12.2,29.24,12.2h68.96M902.62,296.06,864.42,199.01c-.46-.55-.97-1.11-1.52-1.66-8.09-8.13-17.84-12.2-29.24-12.2s-21.15,4.07-29.24,12.2c-.55.55-1.06,1.11-1.52,1.66h61.51Z"/>
                    <path class="cls-1" d="M1040.35,192.08c-5.42-5.36-19.77-6.93-27.4-6.93s-14.14,2.7-19.51,8.11c-5.38,5.41-8.07,11.95-8.07,19.62v110.92h-55.16v-194.11h27.58c7.54,0,13.97,2.64,19.31,7.9,10.84-5.27,22.8-7.9,35.85-7.9,22.9,0,38.18,4.1,54.37,20.27M1080.73,204.76"/>
                  </g>
                </svg>
              </div>
              <button class="close-btn" title="Close">×</button>
            </div>
            <div class="mirror-toggle-row">
              <div class="mirror-toggle-inline">
                <span class="mirror-label">Mirror</span>
                <label class="toggle-switch">
                  <input type="checkbox" id="yt-dance-mirrorToggle">
                  <span class="slider"></span>
                </label>
              </div>
            </div>
            <div class="yt-dance-row">
              <div class="speed-slider-container">
                <div class="speed-value" id="yt-dance-speedValue">1.0x</div>
                <div class="slider-tick-container">
                  <input type="range" class="speed-slider" id="yt-dance-speedSlider" min="0.1" max="1" step="0.05" value="1">
                  <div class="slider-ticks"></div>
                </div>
                <div class="speed-labels" id="yt-dance-speedLabels"></div>
              </div>
            </div>
            <div class="countdown-section">
              <div class="countdown-toggle-row">
                <div class="countdown-toggle-inline">
                  <span class="countdown-label">Countdown</span>
                  <label class="toggle-switch">
                    <input type="checkbox" id="yt-dance-countdownToggle">
                    <span class="slider"></span>
                  </label>
                </div>
                <div class="countdown-input-group">
                  <div class="countdown-input-wrapper">
                    <input type="number" id="countdown-seconds" placeholder="5" min="1" max="60" disabled>
                    <span class="countdown-input-suffix">seconds</span>
                  </div>
                  <button type="button" id="set-timer-btn" disabled>Set Timer</button>
                </div>
              </div>
            </div>
            <div class="segments-section">
              <div class="segments-title">Segments</div>
              <div class="segments-list" id="segments-list"></div>
              <button class="add-segment-btn" id="add-segment-btn">Add Section</button>
            </div>
            <div class="metronome-section">
              <div class="metronome-title-row">
                <div class="metronome-title">Metronome</div>
                <label class="toggle-switch" id="metronome-toggle" style="display: none;">
                  <input type="checkbox" id="metronome-toggle-input">
                  <span class="slider"></span>
                </label>
              </div>
              <div class="metronome-content">
                <button class="configure-metronome-btn" id="configure-metronome-btn">Configure Timing</button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(card);

        const segmentsConfigCard = document.createElement('div');
        segmentsConfigCard.id = 'segments-config-card';
        segmentsConfigCard.style.display = 'none';
        segmentsConfigCard.innerHTML = `
          <div class="segments-config-inner">
            <div class="segments-config-title-row">
              <div class="segments-config-title">Configure Section</div>
              <button class="close-btn" title="Close">×</button>
            </div>
            <div class="config-form">
              <div class="form-group">
                <label for="segment-name">Section Name</label>
                <input type="text" id="segment-name" maxlength="50" placeholder="Enter section name">
              </div>
              <div class="form-group">
                <label for="start-time">Start Time</label>
                <div class="time-input-group">
                  <input type="text" id="start-time" placeholder="0:00" pattern="[0-9]*:[0-5][0-9]">
                  <button type="button" id="current-start-btn">Current Time</button>
                </div>
              </div>
              <div class="form-group">
                <label for="end-time">End Time</label>
                <div class="time-input-group">
                  <input type="text" id="end-time" placeholder="0:00" pattern="[0-9]*:[0-5][0-9]">
                  <button type="button" id="current-end-btn">Current Time</button>
                </div>
              </div>
              <div class="config-buttons">
                <button type="button" id="save-segment-btn">Save</button>
                <button type="button" id="cancel-segment-btn">Cancel</button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(segmentsConfigCard);

        const metronomeConfigCard = document.createElement('div');
        metronomeConfigCard.id = 'metronome-config-card';
        metronomeConfigCard.style.display = 'none';
        metronomeConfigCard.innerHTML = `
          <div class="metronome-config-inner">
            <div class="metronome-config-title-row">
              <div class="metronome-config-title">Configure Metronome</div>
              <button class="close-btn" title="Close">×</button>
            </div>
            <div class="metronome-config-content">
              <div class="metronome-instructions">
                <p>1. Play the video and listen to the beat</p>
                <p>2. Press <strong>B</strong> or tap the button below to the beat</p>
                <p>3. Continue tapping for 15 seconds to establish timing</p>
              </div>
              <div class="metronome-tap-section">
                <div class="tap-counter" id="tap-counter">0 taps</div>
                <div class="tap-timer" id="tap-timer">15</div>
                <button class="tap-button" id="tap-button">TAP TO BEAT</button>
              </div>
              <div class="metronome-results" id="metronome-results" style="display: none;">
                <div class="results-title">Timing Results</div>
                <div class="results-content">
                  <div class="result-item">
                    <span class="result-label">BPM:</span>
                    <span class="result-value" id="bpm-result">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(metronomeConfigCard);

        const countdownDisplay = document.createElement('div');
        countdownDisplay.id = 'countdown-display';
        countdownDisplay.style.display = 'none';
        countdownDisplay.innerHTML = '<div class="countdown-number">5</div>';
        document.body.appendChild(countdownDisplay);

        const speedLabelsContainer = card.querySelector('#yt-dance-speedLabels');
        speedLabels.forEach(label => {
            const span = document.createElement('span');
            span.textContent = label;
            speedLabelsContainer.appendChild(span);
        });

        let segments = [];
        let currentVideoId = null;
        let loopingSegmentIndex = null;
        let countdownEnabled = false;
        let countdownSeconds = 5;
        let countdownInterval = null;
        let countdownAudio = null;
        let countdownJustFinished = false;
        let isManualSeek = false;
        let loopJustEnabled = false;
        let isLoopRestarting = false;
        
        let metronomeEnabled = false;
        let metronomeBPM = 0;
        let metronomeStartTime = 0;
        let metronomeBeatTimestamps = [];
        let metronomeNextBeatIndex = 0;
        let metronomeInterval = null;
        let metronomeAudio = null;
        
        let tapTimings = [];
        let tapVideoTimings = [];
        let tapStartTime = 0;
        let tapTimer = 15;
        let tapInterval = null;
        let isTapping = false;
        
        function isSegmentLooping(index) {
            return loopingSegmentIndex === index;
        }
        
        function setLoopState(index, enabled) {
            if (enabled) {
                loopingSegmentIndex = index;
                loopJustEnabled = true;
                isLoopRestarting = false;
                setTimeout(() => {
                    loopJustEnabled = false;
                }, 500);
            } else {
                loopingSegmentIndex = null;
                loopJustEnabled = false;
                isLoopRestarting = false;
            }
            updateLoopButtonStates();
        }
        
        function updateLoopButtonStates() {
            const loopButtons = document.querySelectorAll('.segment-loop-btn');
            loopButtons.forEach((btn, btnIndex) => {
                const isLooping = isSegmentLooping(btnIndex);
                btn.classList.toggle('looping', isLooping);
            });
        }
        
        function checkAndDisableLoopIfOutsideSegment() {
            if (loopingSegmentIndex !== null && !loopJustEnabled && !isLoopRestarting) {
                const segment = segments[loopingSegmentIndex];
                const video = document.querySelector('video');
                if (video) {
                    const currentTime = video.currentTime;
                    const tolerance = 0.5;
                    
                    if (currentTime < (segment.start - tolerance) || currentTime >= segment.end) {
                        setLoopState(loopingSegmentIndex, false);
                    }
                }
            }
        }

        function getVideoId() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('v');
        }

        function isVideoPage() {
            return getVideoId() !== null;
        }

        // Merge formatTime and formatTimeDisplay
        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }

        function parseTime(timeStr) {
            const parts = timeStr.split(':');
            return parseInt(parts[0]) * 60 + parseInt(parts[1]);
        }

        function getCurrentVideoTime() {
            const video = document.querySelector('video');
            return video ? video.currentTime : 0;
        }

        function loadSegments() {
            const videoId = getVideoId();
            if (videoId !== currentVideoId) {
                currentVideoId = videoId;
                try {
                    chrome.storage.local.get(['segments_' + videoId, 'metronome_' + videoId], (result) => {
                        segments = result['segments_' + videoId] || [];
                        renderSegments();
                        const metronomeData = result['metronome_' + videoId];
                        if (metronomeData) {
                            metronomeBPM = metronomeData.bpm;
                            metronomeBeatTimestamps = metronomeData.beatTimestamps || [];
                            updateMetronomeUI();
                        } else {
                            resetMetronomeUI();
                        }
                    });
                } catch (e) {
                    // Extension context invalidated, ignore
                }
            }
        }

        function handleVideoChange() {
            const newVideoId = getVideoId();
            if (newVideoId !== currentVideoId) {
                closePopup();
                loadSegments();
                
                countdownEnabled = false;
                countdownJustFinished = false;
                stopCountdown();
                
                metronomeEnabled = false;
                stopMetronome();
                
                const countdownToggle = card.querySelector('#yt-dance-countdownToggle');
                if (countdownToggle) {
                    countdownToggle.checked = false;
                }
                
                const metronomeToggle = card.querySelector('#metronome-toggle-input');
                if (metronomeToggle) {
                    metronomeToggle.checked = false;
                }

                // Reset mirror toggle and video transform
                const mirrorToggle = card.querySelector('#yt-dance-mirrorToggle');
                if (mirrorToggle) {
                    mirrorToggle.checked = false;
                }
                const video = document.querySelector('video');
                if (video) {
                    video.style.transform = 'scaleX(1)';
                }

                setTimeout(() => {
                    setupVideoTimeListener();
                }, 1000);
            }
        }

        function closePopup() {
            card.style.display = 'none';
            segmentsConfigCard.style.display = 'none';
        }

        function checkAndClosePopup() {
            if (!isVideoPage()) {
                closePopup();
            } else {
                const newVideoId = getVideoId();
                if (newVideoId !== currentVideoId && card.style.display === 'block') {
                    closePopup();
                }
            }
        }

        function saveSegments() {
            if (currentVideoId) {
                try {
                    chrome.storage.local.set({ ['segments_' + currentVideoId]: segments });
                } catch (e) {
                    // Extension context invalidated, ignore
                }
            }
        }

        function saveMetronomeData() {
            if (currentVideoId && metronomeBPM > 0) {
                try {
                    chrome.storage.local.set({
                        ['metronome_' + currentVideoId]: {
                            bpm: metronomeBPM,
                            beatTimestamps: metronomeBeatTimestamps
                        }
                    });
                } catch (e) {
                    // Extension context invalidated, ignore
                }
            }
        }

        function updateMetronomeUI() {
            const toggle = document.getElementById('metronome-toggle');
            const configureBtn = document.getElementById('configure-metronome-btn');
            
            if (metronomeBPM > 0) {
                toggle.style.display = 'block';
                configureBtn.textContent = 'Reconfigure Timing';
            } else {
                toggle.style.display = 'none';
                configureBtn.textContent = 'Configure Timing';
            }
        }

        function resetMetronomeUI() {
            metronomeBPM = 0;
            metronomeBeatTimestamps = [];
            metronomeEnabled = false;
            updateMetronomeUI();
            
            const toggleInput = document.getElementById('metronome-toggle-input');
            if (toggleInput) {
                toggleInput.checked = false;
            }
        }

        function renderSegments() {
            const segmentsList = card.querySelector('#segments-list');
            const addBtn = card.querySelector('#add-segment-btn');
            
            segmentsList.innerHTML = '';
            
            if (segments.length === 0) {
                addBtn.style.display = 'block';
            } else {
                segments.forEach((segment, index) => {
                    const segmentEl = document.createElement('div');
                    segmentEl.className = 'segment-item';
                    const loopIcon = '<svg height="20px" viewBox="0 0 545.487 545.487" width="20px" style="fill:white;"><path d="M545.487,269.909v7.995c0,65.811-53.546,119.338-119.344,119.338H331.24c0,0,22.023-14.931,17.235-46.589h77.668c40.122,0,72.761-32.633,72.761-72.755v-7.995c0-40.125-32.645-72.761-72.761-72.761h-106.85l0,0h-28.176l16.443,41.632c0.579,1.469,0.106,3.142-1.152,4.091c-1.266,0.957-3.003,0.951-4.256-0.018l-86.123-66.198c-0.872-0.665-1.374-1.696-1.374-2.784c0-1.09,0.502-2.125,1.374-2.79l86.123-66.204c0.632-0.496,1.389-0.733,2.146-0.733c0.745,0,1.489,0.231,2.116,0.707c1.259,0.952,1.731,2.627,1.146,4.093l-16.432,41.636h28.17v-0.006h106.844C491.941,150.562,545.487,204.104,545.487,269.909z M243.34,302.628c-1.253-0.964-2.991-0.97-4.256-0.012c-1.259,0.951-1.731,2.63-1.149,4.09l16.438,41.63h-28.174l0,0H119.344c-40.122,0-72.758-32.646-72.758-72.762v-7.997c0-40.117,32.642-72.759,72.758-72.759h77.667c-4.788-31.649,17.233-46.586,17.233-46.586h-94.9C53.543,148.233,0,201.767,0,267.578v7.997c0,65.811,53.543,119.345,119.344,119.345h106.843v-0.007h28.173l-16.438,41.63c-0.582,1.472-0.109,3.15,1.149,4.096c0.63,0.479,1.375,0.71,2.119,0.71c0.75,0,1.513-0.236,2.143-0.733l86.12-66.2c0.875-0.668,1.377-1.696,1.377-2.79c0-1.1-0.502-2.122-1.377-2.79L243.34,302.628z"/></svg>';
                    segmentEl.innerHTML = `
                        <div class="segment-info">
                            <div class="segment-name">${segment.name}</div>
                            <div class="segment-time">${formatTime(segment.start)} - ${formatTime(segment.end)}</div>
                        </div>
                        <div class="segment-actions">
                            <button class="segment-play-btn" data-index="${index}">▶</button>
                            <button class="segment-loop-btn" data-index="${index}">${loopIcon}</button>
                            <button class="segment-delete-btn" data-index="${index}">×</button>
                        </div>
                    `;
                    segmentsList.appendChild(segmentEl);
                });
                addBtn.style.display = 'block';
            }
            
            updateLoopButtonStates();
        }

        function showConfigCard() {
            // Set config card position to match main card
            segmentsConfigCard.style.left = card.style.left;
            segmentsConfigCard.style.top = card.style.top;
            segmentsConfigCard.style.position = 'fixed';
            segmentsConfigCard.style.zIndex = 10000;
            card.style.display = 'none';
            segmentsConfigCard.style.display = 'block';
            // Removed: positionConfigCard();
        }

        function hideConfigCard() {
            segmentsConfigCard.style.display = 'none';
            card.style.display = 'block';
            // Removed: positionCard();
        }

        function showMetronomeConfigCard() {
            // Set config card position to match main card
            metronomeConfigCard.style.left = card.style.left;
            metronomeConfigCard.style.top = card.style.top;
            metronomeConfigCard.style.position = 'fixed';
            metronomeConfigCard.style.zIndex = 10000;
            card.style.display = 'none';
            metronomeConfigCard.style.display = 'block';
            // Removed: positionMetronomeConfigCard();
            resetTapSession();
            
            if (metronomeEnabled) {
                stopMetronome();
            }
        }

        function hideMetronomeConfigCard() {
            metronomeConfigCard.style.display = 'none';
            card.style.display = 'block';
            // Removed: positionCard();
            
            if (tapInterval) {
                clearInterval(tapInterval);
                tapInterval = null;
            }
            isTapping = false;
            resetTapSession();
            
            if (metronomeEnabled) {
                startMetronome();
            }
        }

        function startCountdown() {
            if (!countdownEnabled || countdownJustFinished) return;
            
            clearInterval(countdownInterval);
            let currentCount = countdownSeconds;
            const video = document.querySelector('video');
            
            if (video) {
                video.pause();
            }
            
            countdownDisplay.style.display = 'block';
            countdownDisplay.querySelector('.countdown-number').textContent = currentCount;
            
            if (countdownAudio) {
                countdownAudio.play().catch(e => console.log('Audio play failed:', e));
            }
            
            countdownInterval = setInterval(() => {
                currentCount--;
                countdownDisplay.querySelector('.countdown-number').textContent = currentCount;
                
                if (currentCount > 0 && countdownAudio) {
                    countdownAudio.play().catch(e => console.log('Audio play failed:', e));
                }
                
                if (currentCount <= 0) {
                    clearInterval(countdownInterval);
                    countdownDisplay.style.display = 'none';
                    countdownJustFinished = true;
                    if (video) {
                        video.play();
                    }
                    setTimeout(() => {
                        countdownJustFinished = false;
                    }, 1000);
                }
            }, 1000);
        }

        function stopCountdown() {
            clearInterval(countdownInterval);
            countdownDisplay.style.display = 'none';
            const video = document.querySelector('video');
            if (video) {
                video.play();
            }
        }

        function resetTapSession() {
            tapTimings = [];
            tapVideoTimings = [];
            tapTimer = 15;
            isTapping = false;
            
            const tapCounter = document.getElementById('tap-counter');
            const tapTimerEl = document.getElementById('tap-timer');
            const results = document.getElementById('metronome-results');
            const tapButton = document.getElementById('tap-button');
            
            if (tapCounter) tapCounter.textContent = '0 taps';
            if (tapTimerEl) tapTimerEl.textContent = '15';
            if (results) results.style.display = 'none';
            
            if (tapButton) {
                tapButton.textContent = 'TAP TO BEAT';
                tapButton.onclick = null;
            }
        }

        function startTapSession() {
            if (isTapping) return;
            
            isTapping = true;
            tapStartTime = Date.now();
            tapTimings = [];
            
            tapInterval = setInterval(() => {
                tapTimer--;
                const tapTimerEl = document.getElementById('tap-timer');
                if (tapTimerEl) tapTimerEl.textContent = tapTimer;
                
                if (tapTimer <= 0) {
                    endTapSession();
                }
            }, 1000);
        }

        function endTapSession() {
            clearInterval(tapInterval);
            isTapping = false;
            
            if (tapTimings.length >= 8) {
                calculateMetronomeTiming();
                if (metronomeBPM >= 80 && metronomeBPM <= 180) {
                    showMetronomeResults();
                } else {
                    alert('Calculated BPM (' + metronomeBPM + ') is outside the valid range (80-180 BPM). Please try again with more consistent tapping.');
                    resetTapSession();
                }
            } else {
                alert('Please tap at least 8 times to establish accurate timing.');
                resetTapSession();
            }
        }

        function recordTap() {
            if (!isTapping) {
                startTapSession();
            }
            
            const currentTime = performance.now();
            const video = document.querySelector('video');
            const videoTime = video ? video.currentTime : 0;
            
            tapTimings.push(currentTime);
            tapVideoTimings.push(videoTime);
            
            const tapCounter = document.getElementById('tap-counter');
            if (tapCounter) {
                tapCounter.textContent = tapTimings.length + ' taps';
            }
        }

        function calculateMetronomeTiming() {
            if (tapVideoTimings.length < 8) return;
            
            const videoIntervals = [];
            for (let i = 1; i < tapVideoTimings.length; i++) {
                videoIntervals.push(tapVideoTimings[i] - tapVideoTimings[i-1]);
            }
            
            const medianInterval = videoIntervals.sort((a, b) => a - b)[Math.floor(videoIntervals.length / 2)];
            const filteredIntervals = videoIntervals.filter(interval => 
                Math.abs(interval - medianInterval) / medianInterval <= 0.2
            );
            
            if (filteredIntervals.length < 3) return;
            
            const avgVideoInterval = filteredIntervals.reduce((a, b) => a + b, 0) / filteredIntervals.length;
            metronomeBPM = Math.round(60 / avgVideoInterval);
            
            if (metronomeBPM < 80 || metronomeBPM > 180) return;
            
            const firstTapTime = tapVideoTimings[0];
            const videoStart = 0;
            const beatsFromStart = (firstTapTime - videoStart) * (metronomeBPM / 60);
            const phaseOffset = beatsFromStart % 1;
            const startDelay = phaseOffset * (60 / metronomeBPM);
            
            const video = document.querySelector('video');
            if (video) {
                const videoDuration = video.duration;
                metronomeBeatTimestamps = [];
                
                let beatNumber = 0;
                let metronomeTimestamp = startDelay + (beatNumber * 60 / metronomeBPM);
                
                while (metronomeTimestamp <= videoDuration) {
                    if (metronomeTimestamp >= 0) {
                        metronomeBeatTimestamps.push(parseFloat(metronomeTimestamp.toFixed(6)));
                    }
                    beatNumber++;
                    metronomeTimestamp = startDelay + (beatNumber * 60 / metronomeBPM);
                }
                
            }
        }

        function showMetronomeResults() {
            const results = document.getElementById('metronome-results');
            const bpmResult = document.getElementById('bpm-result');
            const tapButton = document.getElementById('tap-button');
            
            if (results && bpmResult) {
                bpmResult.textContent = metronomeBPM;
                results.style.display = 'block';
                
                if (tapButton) {
                    tapButton.textContent = 'Retry';
                    tapButton.onclick = () => {
                        resetTapSession();
                        tapButton.onclick = null;
                    };
                }
                
                saveMetronomeData();
                updateMetronomeUI();
            }
        }

        function positionCard() {
            const player = document.querySelector('.html5-video-player');
            if (!player) return;
            const rect = player.getBoundingClientRect();
            const margin = 24; // px
            card.style.position = 'fixed';
            card.style.left = (rect.right - 340 - margin) + 'px';
            card.style.top = (rect.top + margin) + 'px';
            card.style.zIndex = 10000;
        }
        positionCard();
        window.addEventListener('resize', positionCard);
        
        document.addEventListener('fullscreenchange', () => {
            if (card.style.display === 'block') {
                setTimeout(positionCard, 100);
            }
        });
        
        document.addEventListener('webkitfullscreenchange', () => {
            if (card.style.display === 'block') {
                setTimeout(positionCard, 100);
            }
        });

        btn.addEventListener('click', () => {
            if (!isVideoPage()) {
                return;
            }
            card.style.display = card.style.display === 'none' ? 'block' : 'none';
            positionCard();
        });

        document.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('close-btn')) {
                if (card.style.display === 'block') {
                card.style.display = 'none';
                }
                if (segmentsConfigCard.style.display === 'block') {
                    hideConfigCard();
                }
                if (metronomeConfigCard.style.display === 'block') {
                    hideMetronomeConfigCard();
                }
            }
        });
        
        document.addEventListener('click', (e) => {
            if (e.target.id === 'tap-button' && tapTimer > 0 && e.target.textContent === 'TAP TO BEAT') {
                recordTap();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'b' && metronomeConfigCard.style.display === 'block' && tapTimer > 0) {
                recordTap();
            }
        });

        card.querySelector('#add-segment-btn').addEventListener('click', showConfigCard);
        
        const configureMetronomeBtn = card.querySelector('#configure-metronome-btn');
        if (configureMetronomeBtn) {
            configureMetronomeBtn.addEventListener('click', showMetronomeConfigCard);
        }
        
        const metronomeToggle = card.querySelector('#metronome-toggle-input');
        if (metronomeToggle) {
            metronomeToggle.addEventListener('change', () => {
                metronomeEnabled = metronomeToggle.checked;
                if (metronomeEnabled) {
                    startMetronome();
                } else {
                    stopMetronome();
                }
            });
        }

        const countdownToggle = card.querySelector('#yt-dance-countdownToggle');
        const countdownInput = card.querySelector('#countdown-seconds');
        const setTimerBtn = card.querySelector('#set-timer-btn');
        
        countdownInput.disabled = false;
        setTimerBtn.disabled = false;

        countdownToggle.addEventListener('change', () => {
            countdownEnabled = countdownToggle.checked;
            
            countdownInput.disabled = false;
            setTimerBtn.disabled = false;
            
            if (!countdownEnabled) {
                stopCountdown();
            } else {
                checkAndStartCountdownIfNeeded();
            }
        });

        setTimerBtn.addEventListener('click', () => {
            const seconds = parseInt(countdownInput.value);
            if (seconds >= 1 && seconds <= 60) {
                countdownSeconds = seconds;
                countdownInput.placeholder = seconds.toString();
            }
        });

        try {
            countdownAudio = new Audio(chrome.runtime.getURL('audio/countdown.mp3'));
            metronomeAudio = new Audio(chrome.runtime.getURL('audio/metronome.mp3'));
        } catch (e) {
            console.log('Could not load audio:', e);
        }

        function checkAndStartCountdownIfNeeded() {
            if (countdownEnabled && !countdownJustFinished) {
                const video = document.querySelector('video');
                if (video && !video.paused) {
                    startCountdown();
                }
            }
        }

        function startMetronome() {
            if (!metronomeEnabled || metronomeBeatTimestamps.length === 0) return;
            
            const video = document.querySelector('video');
            if (!video) return;
            
            if (metronomeInterval) {
                clearInterval(metronomeInterval);
            }
            
            const currentTime = video.currentTime;
            metronomeNextBeatIndex = 0;
            
            const calculateOffset = (bpm) => {
                if (bpm <= 112) return -0.09;
                if (bpm >= 172) return -0.079;
                
                const slope = (-0.079 - (-0.09)) / (172 - 112);
                const offset = -0.09 + slope * (bpm - 112);
                return parseFloat(offset.toFixed(6));
            };
            
            const dynamicOffset = calculateOffset(metronomeBPM);
            
            while (metronomeNextBeatIndex < metronomeBeatTimestamps.length && 
                   currentTime >= (metronomeBeatTimestamps[metronomeNextBeatIndex] + dynamicOffset)) {
                metronomeNextBeatIndex++;
            }
            
            metronomeInterval = setInterval(() => {
                const video = document.querySelector('video');
                if (!video || video.paused) return;
                
                const currentTime = video.currentTime;
                
                while (metronomeNextBeatIndex < metronomeBeatTimestamps.length && 
                       currentTime >= (metronomeBeatTimestamps[metronomeNextBeatIndex] + dynamicOffset)) {
                    if (metronomeAudio) {
                        metronomeAudio.play().catch(e => console.log('Metronome audio play failed:', e));
                    }
                    metronomeNextBeatIndex++;
                }
            }, 50);
        }

        function stopMetronome() {
            if (metronomeInterval) {
                clearInterval(metronomeInterval);
                metronomeInterval = null;
            }
        }

        function validateTimeFormat(timeStr) {
            const timeRegex = /^(\d+):([0-5]\d)$/;
            return timeRegex.test(timeStr);
        }

        function parseTimeInput(timeStr) {
            if (!validateTimeFormat(timeStr)) {
                return null;
            }
            const parts = timeStr.split(':');
            return parseInt(parts[0]) * 60 + parseInt(parts[1]);
        }

        function updateButtonStates() {
            const startTimeInput = segmentsConfigCard.querySelector('#start-time');
            const endTimeInput = segmentsConfigCard.querySelector('#end-time');
            const currentStartBtn = segmentsConfigCard.querySelector('#current-start-btn');
            const currentEndBtn = segmentsConfigCard.querySelector('#current-end-btn');

            const startTime = parseTimeInput(startTimeInput.value);
            const endTime = parseTimeInput(endTimeInput.value);
            const currentVideoTime = getCurrentVideoTime();

            if (endTime !== null && currentVideoTime > endTime) {
                currentStartBtn.disabled = true;
            } else {
                currentStartBtn.disabled = false;
            }

            if (startTime !== null && currentVideoTime < startTime) {
                currentEndBtn.disabled = true;
            } else {
                currentEndBtn.disabled = false;
            }
        }

        segmentsConfigCard.querySelector('#current-start-btn').addEventListener('click', () => {
            const startTimeInput = segmentsConfigCard.querySelector('#start-time');
            const currentTime = getCurrentVideoTime();
            startTimeInput.value = formatTime(currentTime);
            startTimeInput.dataset.exactTime = currentTime.toString();
            delete startTimeInput.dataset.manualInput;
            updateButtonStates();
        });

        segmentsConfigCard.querySelector('#current-end-btn').addEventListener('click', () => {
            const endTimeInput = segmentsConfigCard.querySelector('#end-time');
            const currentTime = getCurrentVideoTime();
            endTimeInput.value = formatTime(currentTime);
            endTimeInput.dataset.exactTime = currentTime.toString();
            delete endTimeInput.dataset.manualInput;
            updateButtonStates();
        });

        segmentsConfigCard.querySelector('#start-time').addEventListener('input', () => {
            const startTimeInput = segmentsConfigCard.querySelector('#start-time');
            startTimeInput.dataset.manualInput = 'true';
            delete startTimeInput.dataset.exactTime;
            updateButtonStates();
        });

        segmentsConfigCard.querySelector('#end-time').addEventListener('input', () => {
            const endTimeInput = segmentsConfigCard.querySelector('#end-time');
            endTimeInput.dataset.manualInput = 'true';
            delete endTimeInput.dataset.exactTime;
            updateButtonStates();
        });

        function setupVideoTimeListener() {
            const video = document.querySelector('video');
            if (video) {
                video.removeEventListener('timeupdate', handleTimeUpdate);
                video.removeEventListener('seeked', handleSeeked);
                video.removeEventListener('play', handlePlay);
                video.removeEventListener('seeking', handleSeeking);
                
                video.addEventListener('timeupdate', handleTimeUpdate);
                video.addEventListener('seeked', handleSeeked);
                video.addEventListener('play', handlePlay);
                video.addEventListener('seeking', handleSeeking);
                
                checkAndStartCountdownIfNeeded();
            }
        }

        function handleTimeUpdate() {
            updateButtonStates();
            checkLoopSegment();
            checkAndDisableLoopIfOutsideSegment();
        }

        function handleSeeked() {
            updateButtonStates();
            
            if (isManualSeek && loopingSegmentIndex !== null && !loopJustEnabled && !isLoopRestarting) {
                setLoopState(loopingSegmentIndex, false);
            } else {
                checkAndDisableLoopIfOutsideSegment();
            }
            
            if (countdownEnabled && !countdownJustFinished) {
                startCountdown();
            }
            
            if (metronomeEnabled) {
                startMetronome();
            }
        }

        function handlePlay() {
            if (countdownEnabled && !countdownJustFinished) {
                startCountdown();
            }
        }

        function handleSeeking() {
            isManualSeek = true;
            setTimeout(() => {
                isManualSeek = false;
            }, 200);
        }

        function setupManualNavigationDetection() {
            document.addEventListener('click', (e) => {
                if (e.target.closest('.ytp-progress-bar') || 
                    e.target.closest('.ytp-progress-list') ||
                    e.target.closest('.ytp-progress-listener')) {
                    isManualSeek = true;
                    setTimeout(() => {
                        isManualSeek = false;
                    }, 300);
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || 
                    e.key === 'Home' || e.key === 'End') {
                    isManualSeek = true;
                    setTimeout(() => {
                        isManualSeek = false;
                    }, 300);
                }
            });
        }

        function checkLoopSegment() {
            if (loopingSegmentIndex !== null && !loopJustEnabled && !isLoopRestarting) {
                const segment = segments[loopingSegmentIndex];
                const video = document.querySelector('video');
                if (video && video.currentTime >= segment.end) {
                    if (!isManualSeek) {
                        isLoopRestarting = true;
                        video.currentTime = segment.start;
                        if (countdownEnabled) {
                            countdownJustFinished = false;
                            startCountdown();
                        }
                        setTimeout(() => {
                            isLoopRestarting = false;
                        }, 200);
                    } else {
                        setLoopState(loopingSegmentIndex, false);
                    }
                }
            }
        }

        setupVideoTimeListener();
        setupManualNavigationDetection();

        setTimeout(() => {
            setupVideoTimeListener();
        }, 2000);

        segmentsConfigCard.querySelector('#save-segment-btn').addEventListener('click', () => {
            const nameInput = segmentsConfigCard.querySelector('#segment-name');
            const startTimeInput = segmentsConfigCard.querySelector('#start-time');
            const endTimeInput = segmentsConfigCard.querySelector('#end-time');
            
            const name = nameInput.value.trim();
            
            let startTime, endTime;
            
            if (startTimeInput.dataset.exactTime) {
                startTime = parseFloat(startTimeInput.dataset.exactTime);
            } else if (startTimeInput.dataset.manualInput) {
                startTime = parseTimeInput(startTimeInput.value);
            } else {
                startTime = parseTime(startTimeInput.value);
            }
            
            if (endTimeInput.dataset.exactTime) {
                endTime = parseFloat(endTimeInput.dataset.exactTime);
            } else if (endTimeInput.dataset.manualInput) {
                endTime = parseTimeInput(endTimeInput.value);
            } else {
                endTime = parseTime(endTimeInput.value);
            }
            
            if (!name) {
                alert('Please enter a section name.');
                return;
            }
            
            if (startTime === null) {
                alert('Please enter a valid start time in MM:SS format (e.g., 1:30).');
                return;
            }
            
            if (endTime === null) {
                alert('Please enter a valid end time in MM:SS format (e.g., 2:45).');
                return;
            }
            
            if (endTime <= startTime) {
                alert('End time must be after start time.');
                return;
            }
            
            segments.push({
                name: name,
                start: startTime,
                end: endTime,
                videoId: currentVideoId
            });
            
            saveSegments();
            renderSegments();
            
            nameInput.value = '';
            startTimeInput.value = '';
            endTimeInput.value = '';
            delete startTimeInput.dataset.exactTime;
            delete startTimeInput.dataset.manualInput;
            delete endTimeInput.dataset.exactTime;
            delete endTimeInput.dataset.manualInput;
            
            hideConfigCard();
        });

        segmentsConfigCard.querySelector('#cancel-segment-btn').addEventListener('click', hideConfigCard);

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('segment-play-btn')) {
                const index = parseInt(e.target.dataset.index);
                const segment = segments[index];
                const video = document.querySelector('video');
                if (video) {
                    setLoopState(loopingSegmentIndex, false);
                    video.currentTime = segment.start;
                    video.play();
                    if (countdownEnabled) {
                        countdownJustFinished = false;
                        startCountdown();
                    }
                }
            }
            
            if (e.target.classList.contains('segment-loop-btn') || e.target.closest('.segment-loop-btn')) {
                const loopBtn = e.target.classList.contains('segment-loop-btn') ? e.target : e.target.closest('.segment-loop-btn');
                const index = parseInt(loopBtn.dataset.index);
                const segment = segments[index];
                const video = document.querySelector('video');
                if (video) {
                    if (isSegmentLooping(index)) {
                        setLoopState(index, false);
                    } else {
                        setLoopState(index, true);
                        video.currentTime = segment.start;
                        video.play();
                        if (countdownEnabled) {
                            countdownJustFinished = false;
                            startCountdown();
                        }
                    }
                }
            }
            
            if (e.target.classList.contains('segment-delete-btn')) {
                const index = parseInt(e.target.dataset.index);
                segments.splice(index, 1);
                if (loopingSegmentIndex === index) {
                    setLoopState(index, false);
                } else if (loopingSegmentIndex > index) {
                    loopingSegmentIndex--;
                }
                saveSegments();
                renderSegments();
            }
        });

        loadSegments();

        const observer = new MutationObserver(() => {
            checkAndClosePopup();
            handleVideoChange();
            
            const video = document.querySelector('video');
            if (video && !video.hasAttribute('data-dance-listeners-setup')) {
                video.setAttribute('data-dance-listeners-setup', 'true');
                setupVideoTimeListener();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        window.addEventListener('popstate', () => {
            checkAndClosePopup();
            handleVideoChange();
            setTimeout(checkAndDisableLoopIfOutsideSegment, 100);
        });
        window.addEventListener('pushstate', () => {
            checkAndClosePopup();
            handleVideoChange();
            setTimeout(checkAndDisableLoopIfOutsideSegment, 100);
        });
        window.addEventListener('replacestate', () => {
            checkAndClosePopup();
            handleVideoChange();
            setTimeout(checkAndDisableLoopIfOutsideSegment, 100);
        });

        const speedSlider = card.querySelector('#yt-dance-speedSlider');
        const speedValue = card.querySelector('#yt-dance-speedValue');
        speedSlider.addEventListener('input', () => {
            const speed = parseFloat(speedSlider.value);
            speedValue.textContent = speed.toFixed(2) + 'x';
            const video = document.querySelector('video');
            if (video) video.playbackRate = speed;
        });

        const mirrorToggle = card.querySelector('#yt-dance-mirrorToggle');
        mirrorToggle.addEventListener('change', () => {
            const video = document.querySelector('video');
            if (video) video.style.transform = mirrorToggle.checked ? 'scaleX(-1)' : 'scaleX(1)';
        });

        const sliderTicks = card.querySelector('.slider-ticks');
        const minSpeed = 0.1;
        const maxSpeed = 1.0;
        const step = 0.05;
        const numSteps = Math.round((maxSpeed - minSpeed) / step);
        const numTicks = numSteps + 1;
        
        for (let i = 0; i < numTicks; i++) {
            const tick = document.createElement('div');
            tick.className = 'slider-tick';
            if (i % 2 === 0) tick.classList.add('slider-tick-major');
            sliderTicks.appendChild(tick);
        }

        const titleBar = card.querySelector('#yt-dance-card-title-row') || card.querySelector('.yt-dance-card-title-row');
        let isDragging = false, dragOffsetX = 0, dragOffsetY = 0;
        titleBar.style.cursor = 'move';
        titleBar.addEventListener('mousedown', (e) => {
            isDragging = true;
            const rect = card.getBoundingClientRect();
            dragOffsetX = e.clientX - rect.left;
            dragOffsetY = e.clientY - rect.top;
            document.body.style.userSelect = 'none';
        });
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                card.style.left = (e.clientX - dragOffsetX) + 'px';
                card.style.top = (e.clientY - dragOffsetY) + 'px';
            }
        });
        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.body.style.userSelect = '';
        });

        // --- Add active animation to all buttons except loop button ---
        const style = document.createElement('style');
        style.textContent = `
        .button-active-anim {
            animation: buttonActiveAnim 0.18s cubic-bezier(.4,0,.2,1);
        }
        @keyframes buttonActiveAnim {
            0% { transform: scale(1); box-shadow: 0 0 0 0 #ff000033; }
            60% { transform: scale(0.92); box-shadow: 0 0 8px 2px #ff000033; }
            100% { transform: scale(1); box-shadow: 0 0 0 0 #ff000033; }
        }
        `;
        document.head.appendChild(style);

        function addActiveAnimToButton(btn) {
            btn.addEventListener('click', function(e) {
                // Don't animate loop button
                if (btn.classList.contains('segment-loop-btn')) return;
                btn.classList.remove('button-active-anim');
                // Force reflow for retrigger
                void btn.offsetWidth;
                btn.classList.add('button-active-anim');
                setTimeout(() => btn.classList.remove('button-active-anim'), 180);
            });
        }

        // List of selectors for all buttons except loop button
        const buttonSelectors = [
            '#yt-dance-btn',
            '.close-btn',
            '#set-timer-btn',
            '#add-segment-btn',
            '#configure-metronome-btn',
            '#current-start-btn',
            '#current-end-btn',
            '#save-segment-btn',
            '#cancel-segment-btn',
            '#tap-button',
            '.segment-play-btn',
            '.segment-delete-btn'
        ];
        function applyActiveAnimToAllButtons() {
            buttonSelectors.forEach(sel => {
                document.querySelectorAll(sel).forEach(addActiveAnimToButton);
            });
        }
        // Initial application
        applyActiveAnimToAllButtons();
        // Re-apply after dynamic UI changes
        const observerActiveAnim = new MutationObserver(applyActiveAnimToAllButtons);
        observerActiveAnim.observe(document.body, { childList: true, subtree: true });

        // --- YouTube-style speed slider background ---
        function updateSpeedSliderBg(slider) {
            const min = parseFloat(slider.min);
            const max = parseFloat(slider.max);
            const val = parseFloat(slider.value);
            const percent = ((val - min) / (max - min)) * 100;
            slider.style.background = `linear-gradient(to right, #fff 0%, #fff ${percent}%, #444 ${percent}%, #444 100%)`;
        }
        // Find and update all speed sliders
        function applySpeedSliderBg() {
            document.querySelectorAll('.speed-slider').forEach(slider => {
                updateSpeedSliderBg(slider);
                slider.addEventListener('input', () => updateSpeedSliderBg(slider));
            });
        }
        applySpeedSliderBg();
        // In case of dynamic UI, observe and re-apply
        const observerSpeedSlider = new MutationObserver(applySpeedSliderBg);
        observerSpeedSlider.observe(document.body, { childList: true, subtree: true });

        // Add YouTube-style tooltip for the Dancer button
        const dancerTooltip = document.createElement('div');
        dancerTooltip.className = 'ytp-tooltip-dancer';
        dancerTooltip.textContent = 'Dancer';
        dancerTooltip.style.display = 'none';
        document.body.appendChild(dancerTooltip);
        btn.addEventListener('mouseenter', (e) => {
            const rect = btn.getBoundingClientRect();
            dancerTooltip.style.display = 'block';
            dancerTooltip.style.left = (rect.left + rect.width / 2 - dancerTooltip.offsetWidth / 2) + 'px';
            dancerTooltip.style.top = (rect.top - 38) + 'px';
        });
        btn.addEventListener('mouseleave', () => {
            dancerTooltip.style.display = 'none';
        });
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            dancerTooltip.style.left = (rect.left + rect.width / 2 - dancerTooltip.offsetWidth / 2) + 'px';
            dancerTooltip.style.top = (rect.top - 38) + 'px';
        });


    }

    waitForPlayerControls(injectDanceButton);
})();