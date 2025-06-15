document.addEventListener('DOMContentLoaded', () => {
    const preview = document.getElementById('neonPreview');
    const textInput = document.getElementById('textInput');
    const fontButtons = document.querySelectorAll('.font-btn');
    const colorButtons = document.querySelectorAll('.color-btn');
    const sizeButtons = document.querySelectorAll('.size-btn');
    const glowSlider = document.getElementById('glowSlider');
    const sharpnessSlider = document.getElementById('sharpnessSlider');

    // Verify elements exist
    if (!preview || !glowSlider || !sharpnessSlider) {
        console.error('Required elements not found');
        return;
    }

    // Initialize with default values
    let currentFont = 'Neonderthaw';
    let currentColor = '#ffffff';
    let currentSize = 'Regular';
    let currentGlow = 20;
    let currentSharpness = 100;

    // Initialize preview
    updatePreview();

    // Text Input Handler
    textInput.addEventListener('input', updatePreview);

    // Font Selection Handler
    fontButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            fontButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFont = btn.dataset.font;
            
            // Special handling for Neon World Demo font
            if (currentFont === 'Neon World Demo') {
                currentGlow = 0;
                glowSlider.value = 0;
                const glowValueDisplay = glowSlider.parentElement.querySelector('.slider-value');
                if (glowValueDisplay) {
                    glowValueDisplay.textContent = '0%';
                }
            }
            
            // Update both preview and input field font
            const selectedFontFamily = getFontFamily(currentFont);
            preview.style.fontFamily = selectedFontFamily;
            textInput.style.fontFamily = selectedFontFamily;
            updatePreview();
        });
    });

    // Color Selection Handler
    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            colorButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentColor = btn.dataset.color;
            updatePreview();
        });
    });

    // Size Selection Handler
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSize = btn.querySelector('h3').textContent;
            updatePreview();
        });
    });

    // Direct slider event handlers
    function onGlowChange(e) {
        const value = parseInt(e.target.value);
        currentGlow = value;
        const valueDisplay = e.target.parentElement.querySelector('.slider-value');
        if (valueDisplay) {
            valueDisplay.textContent = value + '%';
        }
        updateNeonEffect();
    }

    function onSharpnessChange(e) {
        const value = parseInt(e.target.value);
        currentSharpness = value;
        const valueDisplay = e.target.parentElement.querySelector('.slider-value');
        if (valueDisplay) {
            valueDisplay.textContent = value + '%';
        }
        updateNeonEffect();
    }

    // Attach slider events
    glowSlider.addEventListener('input', onGlowChange);
    glowSlider.addEventListener('change', onGlowChange);
    sharpnessSlider.addEventListener('input', onSharpnessChange);
    sharpnessSlider.addEventListener('change', onSharpnessChange);

    function updateNeonEffect() {
        // Direct slider values
        const glow = currentGlow;
        const sharp = currentSharpness;

        // Simple calculations with minimal adjustment
        const baseGlow = Math.max(0.5, glow / 20);  // minimum 0.5px, max 5px
        const colorGlow = Math.max(1, glow / 10);   // minimum 1px, max 10px
        const blurAmount = Math.max(0.5, (100 - sharp) / 20); // minimum 0.5px, max 5px

        // Basic text shadow
        const shadow = [
            `0 0 ${blurAmount}px #fff`,
            `0 0 ${baseGlow}px #fff`,
            `0 0 ${colorGlow}px currentColor`,
            `0 0 ${colorGlow * 2}px currentColor`,
            `0 0 ${colorGlow * 3}px currentColor`
        ].join(', ');

        preview.style.textShadow = shadow;
    }

    function updatePreview() {
        // Update text content
        const text = textInput.value || 'Text preview';
        preview.textContent = text;

        // Update font and color
        preview.style.fontFamily = getFontFamily(currentFont);
        preview.style.color = currentColor;

        // Update size with mobile optimization
        let fontSize;
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Mobile-specific size adjustments - Fixed order: Regular < Medium < Large
            switch(currentSize) {
                case 'Regular':
                    fontSize = '24px';  // Smallest size
                    break;
                case 'Medium':
                    fontSize = '28px';  // Medium size
                    break;
                case 'Large':
                    fontSize = '32px';  // Largest size
                    break;
                default:
                    fontSize = '24px';
            }
        } else {
            // Desktop sizes remain the same
            switch(currentSize) {
                case 'Regular':
                    fontSize = '48px';
                    break;
                case 'Medium':
                    fontSize = '64px';
                    break;
                case 'Large':
                    fontSize = '80px';
                    break;
                default:
                    fontSize = '48px';
            }
        }

        // Adjust size based on text length
        if (text.length > 15) {
            const baseSize = parseInt(fontSize);
            fontSize = (baseSize * 0.8) + 'px';
            preview.setAttribute('data-text-length', 'long');
        } else {
            preview.removeAttribute('data-text-length');
        }

        // Special handling for fonts that need smaller sizes
        const largeFonts = ['Neon World Demo', 'Neon Spark', 'Neon Bines', 'Monoton', 'Orbitron'];
        if (largeFonts.includes(currentFont)) {
            const baseSize = parseInt(fontSize);
            fontSize = (baseSize * 0.8) + 'px';
        }

        preview.style.fontSize = fontSize;

        // Update neon effect
        updateNeonEffect();
    }

    // Add resize handler to update preview when screen size changes
    window.addEventListener('resize', () => {
        updatePreview();
    });

    function getFontFamily(font) {
        const fontMap = {
            'Neonderthaw': 'Neonderthaw',
            'Neon World Demo': 'Neon World Demo',
            'Neon Spark': 'Neon Spark',
            'Neon Bines': 'Neon Bines',
            'Passionate': 'Passionate',
            'Carry You': 'Carry You',
            'Zen Tokyo Zoo': 'Zen Tokyo Zoo',
            'Warnes': 'Warnes',
            'Tilt Prism': 'Tilt Prism',
            'Tilt Neon': 'Tilt Neon',
            'Rouge Script': 'Rouge Script',
            'Shadows Into Light': 'Shadows Into Light',
            'Orbitron': 'Orbitron',
            'Nixie One': 'Nixie One',
            'Monoton': 'Monoton',
            'Michroma': 'Michroma',
            'Meow Script': 'Meow Script',
            'Megrim': 'Megrim',
            'Macondo': 'Macondo',
            'Lobster': 'Lobster',
            'League Script': 'League Script',
            'Lavishly Yours': 'Lavishly Yours',
            'Kranky': 'Kranky',
            'Iceberg': 'Iceberg',
            'Iceland': 'Iceland',
            'Great Vibes': 'Great Vibes',
            'Grand Hotel': 'Grand Hotel',
            'Cookie': 'Cookie',
            'Codystar': 'Codystar',
            'Bungee Outline': 'Bungee Outline',
            'Bungee Hairline': 'Bungee Hairline',
            'Audiowide': 'Audiowide',
            'Allura': 'Allura',
            'Alex Brush': 'Alex Brush',
            'Miltonian': 'Miltonian',
            'Sunshiney': 'Sunshiney',
            'Indie Flower': 'Indie Flower',
            'Tourney': 'Tourney',
            'Oooh Baby': 'Oooh Baby',
            'Condiment': 'Condiment',
            'Almendra Display': 'Almendra Display',
            'Ballet': 'Ballet',
            'Quintessential': 'Quintessential',
            'Nosifer': 'Nosifer',
            'Ms Madi': 'Ms Madi',
            'Twinkle Star': 'Twinkle Star',
            'Butterfly Kids': 'Butterfly Kids',
            'Ole': 'Ole',
            'Anaheim': 'Anaheim',
            'Poiret One': 'Poiret One',
            'Stalemate': 'Stalemate',
            'Sacramento': 'Sacramento',
            'Lovers Quarrel': 'Lovers Quarrel',
            'Kings': 'Kings',
            'Pacifico': 'Pacifico',
            'Nickainley': 'Nickainley',
            'Yellowtail': 'Yellowtail'
        };
        return fontMap[font] || 'Neonderthaw';
    }
}); 