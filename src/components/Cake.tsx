const Cake = () => {
    return (
        <div className="birthday-page">
            <div className="candle">
                <div className="flame">
                    <div className="shadows" />
                    <div className="top" />
                    <div className="middle" />
                    <div className="bottom" />
                </div>
                <div className="wick" />
                <div className="wax" />
            </div>

            <div className="cake">
                <div className="layer top" />
                <div className="layer middle" />
                <div className="layer bottom" />
                <div className="icing" />
                <div className="drip drip1" />
                <div className="drip drip2" />
                <div className="drip drip3" />
            </div>

            <div className="text">
                <h1>Cake for you!</h1>
                <p>Enjoy and live every moment.</p>
            </div>

            <script dangerouslySetInnerHTML={{
                __html: `
          // Initialize audio context when page loads
            window.onload = async function() {
                try {
                const context = new AudioContext();
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const source = context.createMediaStreamSource(stream);
                const analyzer = context.createAnalyser();
                
                analyzer.fftSize = 2048;
                source.connect(analyzer);
                
                const bufferLength = analyzer.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                let isListening = true;
                
                const checkBlow = () => {
                    analyzer.getByteFrequencyData(dataArray);
                    
                    // Calculate average frequency
                    const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
                    
                    // Log the average for debugging
                    console.log('Sound level:', average);
                    
                    // Lower the threshold and make sure we're detecting the blow
                    if (average > 30) { // Lowered from 50 to 30 for better sensitivity
                    console.log('Blow detected!');
                    const flame = document.querySelector('.flame');
                    if (flame && !flame.classList.contains('blown')) {
                        console.log('Extinguishing flame...');
                        flame.classList.add('blown');
                        isListening = false;
                        stream.getTracks().forEach(track => track.stop());
                    }
                    }
                    
                    if (isListening) {
                    requestAnimationFrame(checkBlow);
                    }
                };
                
                checkBlow();
                console.log('Blow detection started');
                } catch (error) {
                console.error("Error accessing microphone:", error);
                }
            };
            `}} />
            </div>
        );
    };

export default Cake;