// JavaScript file loader for split chunks
// Original file: frontend/skybook/skybook4/ar_SA/mage/requirejs/mixins.min.js
// Split into 5 chunks

// Optimized RequireJS Loader
// This is a special optimized loader for RequireJS itself
(function() {
    // Store original load time for performance tracking
    window._requireJsLoadStart = new Date().getTime();

    // Chunks for RequireJS
    var chunks = [];
    chunks.push('frontend/skybook/skybook4/ar_SA/mage/requirejs/mixins.min_chunk1.js');
    chunks.push('frontend/skybook/skybook4/ar_SA/mage/requirejs/mixins.min_chunk2.js');
    chunks.push('frontend/skybook/skybook4/ar_SA/mage/requirejs/mixins.min_chunk3.js');
    chunks.push('frontend/skybook/skybook4/ar_SA/mage/requirejs/mixins.min_chunk4.js');
    chunks.push('frontend/skybook/skybook4/ar_SA/mage/requirejs/mixins.min_chunk5.js');

    // Create the worker for parallel processing
    var useWorker = (typeof Worker !== 'undefined' && typeof Blob !== 'undefined' && typeof URL !== 'undefined');
    var worker = null;
    var processingQueue = [];
    var loadedChunks = 0;
    var chunkContents = [];

    // Pre-fetch all chunks immediately to improve performance
    chunks.forEach(function(chunk, index) {
        fetch(chunk)
            .then(function(response) { return response.text(); })
            .then(function(code) {
                chunkContents[index] = code;
                loadedChunks++;
                if (loadedChunks === chunks.length) {
                    executeAllChunks();
                }
            });
    });

    function executeAllChunks() {
        // Execute all chunks in sequence
        try {
            // Combine all chunks into one script
            var fullScript = chunkContents.join('\n');
            // Execute the combined script
            var scriptElement = document.createElement('script');
            scriptElement.textContent = fullScript;
            document.head.appendChild(scriptElement);
            
            // Log performance
            var totalTime = new Date().getTime() - window._requireJsLoadStart;
            console.log('RequireJS optimized loader: loaded and executed in ' + totalTime + 'ms');
        } catch (e) {
            console.error('Error executing RequireJS chunks:', e);
            // Fallback to traditional loading
            loadFallback();
        }
    }

    function loadFallback() {
        console.log('Falling back to traditional loading for RequireJS');
        var script = document.createElement('script');
        script.src = chunks[0]; // Use first chunk as fallback
        document.head.appendChild(script);
    }
})();
