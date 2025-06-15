import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Doughnut } from 'react-chartjs-2'; // For PyChart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// html2canvas is now assumed to be globally available via a script tag.
// import html2canvas from 'html2canvas'; // REMOVED: Will be loaded externally

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// --- Confetti Component (Enhanced CSS-based) ---
// This component now takes a 'duration' prop to control how long confetti falls
const Confetti = ({ active, duration = 1500 }) => { // duration in ms, default 1.5s
    // Hooks must be called unconditionally at the top level
    const numPieces = 120; // Fixed number of pieces
    const pieceMinSize = 5;
    const pieceMaxSize = 10;
    const animDelayMax = 1; // Max delay for pieces in seconds

    const [confettiStyles, setConfettiStyles] = useState([]);

    useEffect(() => {
        // Now, the logic inside the effect depends on `active`
        if (active) {
            const styles = [];
            for (let i = 0; i < numPieces; i++) {
                const size = Math.random() * (pieceMaxSize - pieceMinSize) + pieceMinSize;
                const delay = Math.random() * animDelayMax;
                const startX = Math.random() * 100;
                const endX = Math.random() * 1000 - 500;
                const endZ = Math.random() * 400 - 200;
                const rotation = Math.random() * 1080;

                styles.push({
                    background: `hsl(${Math.random() * 360}, 90%, 60%)`,
                    left: `${startX}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration / 1000}s`, // Convert ms to seconds
                    '--end-transform': `translate3d(${endX}px, 120vh, ${endZ}px) rotate(${rotation}deg) scale(0.5)`,
                });
            }
            setConfettiStyles(styles);
        } else {
            // Clear styles when not active to reset confetti
            setConfettiStyles([]);
        }
    }, [active, numPieces, pieceMinSize, pieceMaxSize, animDelayMax, duration]);

    // Only render the container if active
    if (!active && confettiStyles.length === 0) return null; // Only return null if not active AND no styles (i.e., not mid-animation)


    return (
        <div className="confetti-container fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
            <style>
                {`
                .confetti-container {
                    perspective: 1000px;
                }
                .confetti-piece {
                    position: absolute;
                    border-radius: 50%;
                    opacity: 0; /* Starts hidden */
                    animation-name: confetti-fall-enhanced;
                    animation-timing-function: ease-out;
                    animation-fill-mode: forwards;
                }
                @keyframes confetti-fall-enhanced {
                    0% {
                        opacity: 1;
                        transform: translate3d(0, -100px, 0) rotate(0deg) scale(1);
                    }
                    5% { /* Quicker reveal for all confetti */
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                        transform: var(--end-transform); /* Use CSS variable for end state */
                    }
                }
                `}
            </style>
            {confettiStyles.map((style, i) => (
                <div key={i} className="confetti-piece" style={style}></div>
            ))}
        </div>
    );
};

// --- Exercise Data & Generation ---
const generalTexts = [
    "The quick brown fox jumps over the lazy dog. This is a classic pangram used to display typefaces. It contains every letter of the alphabet. This sentence is quite famous in the world of typography and testing.",
    "Artificial intelligence is rapidly transforming various industries across the globe. Machine learning algorithms are becoming more sophisticated, allowing for predictive analytics and automation in many fields. The future seems bright for AI applications.",
    "The Roman Empire's vast infrastructure included roads, aqueducts, and magnificent buildings like the Colosseum. Their engineering prowess allowed them to maintain control over a large and diverse territory for centuries. These structures still stand today as a testament to their skill.",
    "Photosynthesis is the process by which plants convert light energy into chemical energy. This vital biological process forms the basis of most food webs on Earth, producing oxygen as a byproduct. Understanding photosynthesis is key to ecological balance.",
    "The internet has revolutionized communication, commerce, and access to information worldwide. It has connected billions of billions people, enabling instant global interaction and creating new industries. Its impact on society is profound and continues to evolve.",
    "The theory of relativity, developed by Albert Einstein, reshaped our understanding of space and time. It introduced concepts like spacetime and the equivalence of mass and energy. This groundbreaking work fundamentally altered the landscape of modern physics.",
    "Climate change refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, but since the 1800s, human activities have been the main driver of climate change, primarily due to fossil fuel burning. Addressing this global challenge requires urgent action.",
    "Many ancient civilizations contributed significantly to mathematics, astronomy, and philosophy. From the Egyptians and Babylonians to the Greeks and Romans, their intellectual legacies continue to influence modern thought and science. Their discoveries laid foundational knowledge.",
    "The discovery of penicillin by Alexander Fleming marked a turning point in modern medicine. This antibiotic revolutionized the treatment of bacterial infections, saving countless lives. It paved the way for the development of many other life-saving drugs.",
    "Biodiversity is the variety of life on Earth, from genes to ecosystems. It encompasses the diversity of species, genetic variations within species, and the ecosystems they form. Protecting biodiversity is crucial for the health and stability of our planet.",
    "The invention of the printing press by Johannes Gutenberg democratized knowledge dissemination. It allowed for the mass production of books, making information more accessible to a wider audience. This innovation played a pivotal role in the Renaissance and Reformation.",
    "Blockchain technology offers a decentralized and secure way to record transactions. Its immutable and transparent nature makes it suitable for various applications beyond cryptocurrencies, including supply chain management and digital identity. This innovative tech is still evolving.",
    "The Industrial Revolution brought about profound socio-economic and technological changes. It transformed agrarian societies into industrialized ones, leading to urbanization and new forms of production. Its effects are still felt in global economies today.",
    "Ocean currents play a crucial role in regulating global climate and distributing heat around the planet. They influence weather patterns, marine ecosystems, and human activities like shipping. Understanding them is vital for climate science.",
    "Classical music composers like Bach, Mozart, and Beethoven left an enduring legacy of masterpieces. Their works are celebrated for their complexity, emotional depth, and lasting beauty, continuing to be performed and enjoyed worldwide. Their influence is undeniable.",
    "Cybersecurity is essential for protecting computer systems and networks from digital attacks. It involves safeguarding data, privacy, and infrastructure from unauthorized access, damage, or disruption. As technology advances, so too does the need for robust cybersecurity measures.",
    "The Great Wall of China is a series of fortifications built across the historical northern borders of ancient Chinese states and Imperial China to protect against nomadic incursions. It is one of the most impressive feats of ancient engineering. Its sheer scale is breathtaking.",
    "Renewable energy sources like solar and wind power are vital for a sustainable future. They produce clean energy without depleting natural resources or emitting greenhouse gases. Investing in renewables is key to combating climate change and ensuring energy security.",
    "The Renaissance was a period of intense artistic, cultural, and scientific flourishing in Europe. It marked a transition from the Middle Ages to modernity, characterized by a renewed interest in classical learning and humanism. This era produced some of the greatest minds in history.",
    "Quantum computing explores complex problems beyond the reach of classical computers. It leverages principles of quantum mechanics, suchs as superposition and entanglement, to perform computations. While still in its early stages, it holds immense potential for various fields.",
    "The human brain is an incredibly complex organ, responsible for thought, emotion, and memory. It controls all bodily functions and allows us to interact with the world around us. Understanding its intricacies is one of the biggest challenges in science.",
    "Exploration of space continues to expand our understanding of the universe. Missions to other planets, telescopes observing distant galaxies, and the search for extraterrestrial life push the boundaries of human knowledge and inspire future generations. The cosmos is vast and mysterious.",
    "Volcanoes are openings in the Earth's crust that allow molten rock, ash, and gases to escape. They can be incredibly destructive but also create new land and enrich soil. Studying volcanoes helps us understand Earth's geology and predict eruptions.",
    "Microprocessors are the tiny brains of modern electronic devices, from phones to cars. They execute instructions, perform calculations, and manage data, making digital technology possible. Their continuous advancement drives innovation across industries.",
    "The Amazon rainforest is the largest tropical rainforest in the world, vital for global climate regulation and biodiversity. It is home to an astonishing array of plant and animal species, many yet undiscovered. Protecting this unique ecosystem is a global priority.",
    "Democracy is a system of government where citizens exercise power directly or through elected representatives. It is based on the principle of popular sovereignty and typically includes rights like freedom of speech and assembly. Its strength lies in participation.",
    "The invention of the wheel revolutionized transportation and many other aspects of ancient life. It facilitated trade, agriculture, and warfare, becoming one of the most significant technological advancements in human history. Its simple design had profound effects.",
    "Astronomy is the scientific study of celestial objects, phenomena, and the universe. From planets and stars to galaxies and black holes, astronomers seek to unravel the mysteries of the cosmos. It inspires awe and curiosity about our place in the universe.",
    "The concept of zero was a groundbreaking mathematical innovation with immense implications. Originating in ancient India, it revolutionized number systems and paved the way for advanced mathematics and computing. It is fundamental to modern calculations.",
    "Coral reefs are diverse underwater ecosystems supported by colonies of tiny animals called polyps. They are often called the rainforests of the sea due to their incredible biodiversity. Protecting them is crucial for marine life and ocean health."
];

const programmerSnippets = [
    "console.log('Hello, World!'); // Basic JavaScript output",
    "function factorial(n) { if (n === 0) return 1; return n * factorial(n - 1); } // Recursive factorial in JS",
    "const arr = [10, 20, 30, 40, 50]; for (let i = 0; i < arr.length; i++) { console.log(arr[i]); } // Array iteration",
    "public static void main(String[] args) { System.out.println(\"Java is fun.\"); } // Standard Java main method",
    "class MyClass: def __init__(self, name): self.name = name; def greet(self): return f\"Hello, {self.name}\" // Python class example",
    "SELECT id, name, email FROM users WHERE active = TRUE ORDER BY name ASC; // SQL query for user data",
    "var http = require('http'); http.createServer(function (req, res) { res.writeHead(200, {'Content-Type': 'text/plain'}); res.end('Hello Node.js\\n'); }).listen(8080); // Simple Node.js server",
    "def fibonacci(n): a, b = 0, 1; while a < n: print(a, end=' '); a, b = b, a+b // Python Fibonacci sequence",
    "import React from 'react'; function App() { return (<div><h1>My React App</h1></div>); } export default App; // Basic React component structure",
    "let countdown = 5; while (countdown > 0) { console.log(countdown); countdown--; } console.log('Lift off!'); // Simple JS countdown loop",
    "// This is a single-line comment in JavaScript\n/* This is a\nmulti-line comment */ // Different comment types",
    "print('Python is a versatile language for data science and web development.') // Python print statement",
    "for (let i = 0; i < 10; i++) { if (i % 2 === 0) continue; console.log(i); } // Loop with continue statement",
    "const data = { 'name': 'Alice', 'age': 30, 'isStudent': false, 'courses': ['Math', 'Science'] }; // JSON object example",
    "try { const result = 10 / 0; } catch (error) { console.error('Error:', error.message); } // Try-catch block for error handling",
    "git clone <repository_url>\ngit commit -m \"Initial commit\"\ngit push origin main // Common Git commands",
    "if (x > 10) { console.log('x is greater than 10'); } else { console.log('x is 10 or less'); } // Conditional statement",
    "document.getElementById('myElement').addEventListener('click', () => { alert('Element clicked!'); }); // DOM manipulation in JS",
    "ArrayList<String> list = new ArrayList<>(); list.add(\"Item1\"); list.add(\"Item2\"); // Java ArrayList usage",
    "enum Color { RED, GREEN, BLUE }; Color myColor = Color.GREEN; // Enum example",
    "public class HelloWorld { public static void main(String[] args) { System.out.println(\"Hello from Java!\"); } } // Full Java program structure",
    "let promise = new Promise((resolve, reject) => { setTimeout(() => resolve(\"Done!\"), 1000); }); promise.then(value => console.log(value)); // JavaScript Promises",
    "for i in range(5): print(i * i) // Python for loop",
    "// Swift: Declare a constant and a variable\nlet maxLoginAttempts = 3\nvar currentLoginAttempt = 0 // Swift variable declaration",
    "char message[] = \"C++ is powerful!\"; std::cout << message << std::endl; // C++ basic output",
    "import numpy as np\narr = np.array([1, 2, 3])\nprint(arr * 2) // NumPy array operation in Python",
    "CREATE TABLE products (id INT PRIMARY KEY, name VARCHAR(255), price DECIMAL(10, 2)); // SQL CREATE TABLE statement",
    "INSERT INTO users (name, email) VALUES ('John Doe', 'john.doe@example.com'); // SQL INSERT statement",
    "UPDATE products SET price = 29.99 WHERE id = 101; // SQL UPDATE statement",
    "DELETE FROM orders WHERE status = 'cancelled'; // SQL DELETE statement"
];

// Helper to ensure minimum word count
const getWordCount = (text) => text.split(/\s+/).filter(word => word.length > 0).length;

const generateExerciseContent = (levelName, count) => {
    const exercises = [];
    let minWords = 40;
    let sourceTexts = generalTexts;

    // Difficulty increases with level for general texts
    if (levelName === "Intermediate") minWords = 50;
    else if (levelName === "Advanced") minWords = 60;
    else if (levelName === "Pro") minWords = 70;
    else if (levelName === "Master") minWords = 80;
    // Programmer mode uses different source texts but still scales minWords
    else if (["Basic Syntax", "Data Structures", "Web Dev Snippets", "SQL & Git"].includes(levelName)) {
        sourceTexts = programmerSnippets;
        if (levelName === "Data Structures") minWords = 50;
        else if (levelName === "Web Dev Snippets") minWords = 60;
        else if (levelName === "SQL & Git") minWords = 70;
    }

    for (let i = 0; i < count; i++) {
        let text = "";
        let currentWordCount = 0;
        let attemptCount = 0;

        if (levelName === "Beginner" && i < 10) { // Beginner 1-10: Character specialization (fjdksla;)
            const chars = "fjdksla;";
            for(let j = 0; j < Math.floor(minWords * 5 * 1.2); j++) { // Add a buffer for spaces
                text += chars[Math.floor(Math.random() * chars.length)];
                if (j % 5 === 4 && j < (minWords * 5 * 1.2 - 1)) text += " "; // Add space every 5 chars, not at very end
            }
        } else if (levelName === "Beginner" && i < 20) { // Beginner 11-20: Small, simple words
            const simpleWords = ["the", "and", "for", "but", "can", "get", "big", "red", "hot", "run", "eat", "sit", "dog", "cat", "sun", "man", "day", "yes", "no"];
            while (getWordCount(text) < minWords) {
                text += simpleWords[Math.floor(Math.random() * simpleWords.length)] + " ";
            }
        } else { // All other cases: General or Programmer content
            // Loop to concatenate snippets/sentences until minWords is met
            while (currentWordCount < minWords && attemptCount < 100) { // Max attempts to prevent infinite loop
                const snippet = sourceTexts[Math.floor(Math.random() * sourceTexts.length)];
                text += (text.length > 0 && !text.endsWith('\n') ? " " : "") + snippet; // Add space or newline
                currentWordCount = getWordCount(text);
                attemptCount++;
            }
        }
        exercises.push(text.trim());
    }
    return exercises;
};

const levels = ["Beginner", "Intermediate", "Advanced", "Pro", "Master"];
const programmerLevels = ["Basic Syntax", "Data Structures", "Web Dev Snippets", "SQL & Git"];

const exerciseData = {
    // General Levels (100 exercises each, min 40 words)
    "Beginner": generateExerciseContent("Beginner", 100),
    "Intermediate": generateExerciseContent("Intermediate", 100),
    "Advanced": generateExerciseContent("Advanced", 100),
    "Pro": generateExerciseContent("Pro", 100),
    "Master": generateExerciseContent("Master", 100),
    // Programmer Levels (100 exercises each, min 40 words, from programmerSnippets)
    "Basic Syntax": generateExerciseContent("Basic Syntax", 100),
    "Data Structures": generateExerciseContent("Data Structures", 100),
    "Web Dev Snippets": generateExerciseContent("Web Dev Snippets", 100),
    "SQL & Git": generateExerciseContent("SQL & Git", 100),
    // Other Categories (can reuse General content generation)
    "Science & Technology": generateExerciseContent("Science & Technology", 100),
    "History & Culture": generateExerciseContent("History & Culture", 100),
    "Nature & Environment": generateExerciseContent("Nature & Environment", 100),
    "Literature & Arts": generateExerciseContent("Literature & Literature & Arts", 100), // Adjusted category name to avoid conflict and make it longer
    "Random Facts": generateExerciseContent("Random Facts", 100)
};

// --- VirtualKeyboard Component ---
const VirtualKeyboard = ({ keyPressed }) => {
    const keys = [
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
        ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
        ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
        ['Control', 'Alt', ' ', 'Alt', 'Control']
    ];

    const shiftedKeys = {
        '`': '~', '1': '!', '2': '@', '3': '#', '4': '$', '5': '%', '6': '^', '7': '&', '8': '*', '9': '(', '0': ')', '-': '_', '=': '+',
        '[': '{', ']': '}', '\\': '|', ';': ':', "'": '"', ',': '<', '.': '>', '/': '?'
    };

    const isShiftActive = (kP) => {
        if (kP === 'Shift') return true;
        for (const [unshifted, shifted] of Object.entries(shiftedKeys)) {
            if (shifted === kP) {
                return true;
            }
        }
        return false;
    }

    const currentIsShiftActive = isShiftActive(keyPressed);

    const getKeyValue = (key, shiftActive) => {
        if (key === ' ') return 'Space';
        if (shiftActive && shiftedKeys[key]) return shiftedKeys[key];
        return key;
    };

    const normalizeKey = (key) => {
        if (key === ' ') return 'Space';
        if (key === 'Backspace') return 'Backspace';
        if (key === 'Tab') return 'Tab';
        if (key === 'CapsLock') return 'CapsLock';
        if (key === 'Enter') return 'Enter';
        if (key.includes('Shift')) return 'Shift';
        if (key.includes('Control')) return 'Control';
        if (key.includes('Alt')) return 'Alt';
        return key.toLowerCase();
    };

    return (
        <div className="virtual-keyboard select-none mt-8 p-4 rounded-xl shadow-lg bg-gray-100 dark:bg-gray-700 max-w-full overflow-x-auto">
            {keys.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row flex justify-center mb-2">
                    {row.map((key, keyIndex) => {
                        const displayKey = getKeyValue(key, currentIsShiftActive);
                        
                        let keyIsPressed = false; // Changed from const to let

                        // Direct match for regular keys (lowercase for letters)
                        if (key.length === 1 && keyPressed && keyPressed.toLowerCase() === key.toLowerCase()) {
                            keyIsPressed = true;
                        }
                        // Match for special keys like Backspace, Tab, Enter etc.
                        else if (keyPressed === key) {
                            keyIsPressed = true;
                        }
                        // Match for Shift keys
                        else if (key === 'Shift' && keyPressed === 'Shift') {
                            keyIsPressed = true;
                        }
                        // Match for characters produced by Shift + key (e.g., '!' from '1')
                        else if (shiftedKeys[key] && keyPressed === shiftedKeys[key]) {
                            keyIsPressed = true;
                        }

                        let keyWidthClass = 'w-10'; // Default
                        if (key === 'Backspace') keyWidthClass = 'w-20';
                        else if (key === 'Tab' || key === '\\') keyWidthClass = 'w-16';
                        else if (key === 'CapsLock' || key === 'Enter') keyWidthClass = 'w-24';
                        else if (key === 'Shift') keyWidthClass = 'w-28';
                        else if (key === 'Control' || key === 'Alt') keyWidthClass = 'w-16';
                        else if (key === ' ') keyWidthClass = 'flex-grow mx-2'; // Spacebar

                        return (
                            <div
                                key={keyIndex}
                                className={`
                                    keyboard-key h-12 flex items-center justify-center rounded-md text-gray-800 dark:text-gray-100
                                    ${keyWidthClass} font-semibold text-sm transition-all duration-75
                                    ${keyIsPressed ? 'bg-blue-500 dark:bg-blue-400 text-white shadow-inner-lg' : 'bg-gray-200 dark:bg-gray-600 shadow-md hover:bg-gray-300 dark:hover:bg-gray-500'}
                                    ${key === ' ' ? 'px-4' : 'px-2'}
                                `}
                            >
                                {displayKey === ' ' ? 'Space' : displayKey}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

// --- CertificateGenerator Component ---
const CertificateGenerator = ({ wpm, duration, theme, onBack }) => {
    const [userName, setUserName] = useState('');
    const certificateRef = useRef(null);
    const [certificateNumber, setCertificateNumber] = useState(null);
    const [statusMessage, setStatusMessage] = useState(''); // New state for status messages

    // Load or initialize certificate number
    useEffect(() => {
        const storedCertNumber = localStorage.getItem('nextCertificateNumber');
        const initialNumber = storedCertNumber ? parseInt(storedCertNumber, 10) : 1000;
        setCertificateNumber(initialNumber);
        console.log(`CertificateGenerator: Initial Certificate Number loaded: ${initialNumber}`);
    }, []);

    // Function to update the next certificate number in local storage
    const updateNextCertificateNumber = useCallback(() => {
        if (certificateNumber !== null) {
            const newNumber = certificateNumber + 1;
            localStorage.setItem('nextCertificateNumber', newNumber.toString());
            setCertificateNumber(newNumber); // Update state for potential immediate next use
            console.log(`Certificate Number updated to: ${newNumber}`);
        }
    }, [certificateNumber]);

    const handleDownloadCertificate = async (format) => {
        setStatusMessage(''); // Clear previous messages
        if (!userName) {
            setStatusMessage("Please enter your name for the certificate!");
            return;
        }
        // Ensure WPM and Duration are valid numbers for display
        const displayWPM = isNaN(wpm) ? 'N/A' : wpm;
        const displayDuration = isNaN(duration) ? 'N/A' : duration;

        if (certificateNumber === null) {
            setStatusMessage("Certificate number not loaded. Please try again.");
            return;
        }
        
        // Check if html2canvas is available
        if (typeof window.html2canvas === 'undefined') {
            setStatusMessage("html2canvas library is not loaded. Cannot generate image. Please ensure it's included in your HTML as a script tag: <script src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'></script>");
            console.error("html2canvas library is not loaded. Cannot generate image.");
            return;
        }


        const certificateElement = certificateRef.current;
        if (certificateElement) {
            try {
                // Temporarily hide scrollbars for capture if they appear due to content overflow
                const originalOverflow = document.body.style.overflow;
                document.body.style.overflow = 'hidden';

                console.log("Attempting to capture certificate with html2canvas...");
                const canvas = await window.html2canvas(certificateElement, {
                    scale: 2, // Increase scale for higher resolution
                    useCORS: true,
                    logging: true, // Enable logging for html2canvas
                    // Enable scroll restoration to capture full content if it scrolls
                    scrollX: 0,
                    scrollY: -window.scrollY // Capture from the top of the document
                });

                // Restore scrollbars
                document.body.style.overflow = originalOverflow;

                const dataURL = canvas.toDataURL(`image/${format}`);
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = `TypeMaster_Certificate_${userName.replace(/\s/g, '_')}_${certificateNumber}.${format}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                updateNextCertificateNumber(); // Increment number after successful download
                setStatusMessage(`Certificate downloaded successfully as ${format.toUpperCase()}!`);
                console.log(`Certificate downloaded as ${format.toUpperCase()}`);

            } catch (error) {
                console.error('Error generating certificate:', error);
                setStatusMessage('Failed to generate certificate. Please check the console for details.');
            }
        }
    };

    const handleShareCertificate = () => {
        setStatusMessage(''); // Clear previous messages
        if (!userName) {
            setStatusMessage("Please enter your name for the certificate!");
            return;
        }
        if (certificateNumber === null) {
            setStatusMessage("Certificate number not loaded. Please try again.");
            return;
        }
        // Ensure WPM and Duration are valid numbers for display
        const displayWPM = isNaN(wpm) ? 'N/A' : wpm;
        const displayDuration = isNaN(duration) ? 'N/A' : duration;


        const shareText = `I, ${userName}, achieved ${displayWPM} WPM in a ${displayDuration}-minute typing test on TypeMaster! Check out my certificate (ID: ${certificateNumber}). You can try TypeMaster too!`;
        const shareUrl = window.location.href; // Use the current app URL as a placeholder

        // Attempt to use Web Share API if available
        if (navigator.share) {
            navigator.share({
                title: 'TypeMaster Achievement Certificate',
                text: shareText,
                url: shareUrl,
            }).then(() => {
                console.log('Shared successfully');
                updateNextCertificateNumber(); // Increment number after successful share
                setStatusMessage('Certificate shared successfully!');
            }).catch((error) => {
                console.error('Error sharing:', error);
                // If Web Share API fails or is not supported, provide manual copy option
                setStatusMessage('Sharing failed or is not supported on this browser. Text copied to clipboard.');
                // Fallback: copy text to clipboard
                const el = document.createElement('textarea');
                el.value = shareText + '\n' + shareUrl;
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy'); // Fallback for older browsers
                document.body.removeChild(el);
            });
        } else {
            // Fallback for browsers without Web Share API
            setStatusMessage('Sharing is not supported on this browser. Text copied to clipboard.');
            // Copy text to clipboard
            const el = document.createElement('textarea');
            el.value = shareText + '\n' + shareUrl;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy'); // Fallback for older browsers
            document.body.removeChild(el);
            updateNextCertificateNumber(); // Increment number even on fallback message
        }
    };


    // Colors and styles based on the Freepik image (approximated)
    const year = new Date().getFullYear(); // Dynamic year for the badge
    const certificateDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Ensure wpm and duration are not NaN for display
    const displayWPM = isNaN(wpm) ? 'N/A' : wpm;
    const displayDuration = isNaN(duration) ? 'N/A' : duration;


    return (
        <div className={`flex flex-col items-center p-6 rounded-2xl shadow-xl w-full max-w-4xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Your Achievement Certificate!</h2>
            <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Enter your name to generate your professional certificate.</p>

            <input
                type="text"
                placeholder="Enter Your Full Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className={`w-full max-w-md p-3 mb-6 border-2 rounded-lg text-xl text-center
                            ${theme === 'dark' ? 'bg-gray-700 border-blue-400 text-gray-100' : 'bg-white border-blue-300 text-gray-800'}
                            focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />

            {statusMessage && (
                <div className={`mb-4 p-3 rounded-lg text-center ${statusMessage.includes('Failed') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'} ${theme === 'dark' ? 'dark:bg-opacity-20 dark:text-gray-200' : ''}`}>
                    {statusMessage}
                </div>
            )}

            <div
                ref={certificateRef}
                className={`relative w-full aspect-[1.414/1] bg-white overflow-hidden shadow-2xl`} /* A4 aspect ratio approx */
                style={{
                    backgroundColor: 'white',
                    border: '1px solid #ddd', // Light grey border
                    boxShadow: '0 0 15px rgba(0,0,0,0.2)',
                    minHeight: '400px', // Ensure visibility
                    fontFamily: 'Inter, sans-serif' // Ensuring Inter is used
                }}
            >
                {/* Background Shapes and Dots using SVG */}
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1000 707" preserveAspectRatio="none">
                    {/* Top-Left Shapes */}
                    <polygon points="0,0 250,0 150,150 0,200" fill="#E65D7B" /> {/* Pink */}
                    <polygon points="0,0 150,0 70,100 0,120" fill="#9C27B0" /> {/* Purple overlay */}
                    <polygon points="0,70 100,0 0,0" fill="#FF8A65" /> {/* Orange triangle top left */}
                    <rect x="0" y="200" width="10" height="150" fill="#4DB6AC" /> {/* Vertical bar teal */}
                    <rect x="0" y="200" width="150" height="10" fill="#4DB6AC" /> {/* Horizontal bar teal */}
                    <polygon points="0,250 50,200 0,300" fill="#FFCA28" /> {/* Yellow triangle bottom left of shapes */}
                    <polygon points="100,0 120,50 150,0" fill="#FFCA28" /> {/* Small yellow triangle top left */}

                    {/* Bottom-Right Shapes */}
                    <polygon points="1000,707 750,707 850,557 1000,507" fill="#E65D7B" /> {/* Pink */}
                    <polygon points="1000,707 850,707 930,607 1000,587" fill="#9C27B0" /> {/* Purple overlay */}
                    <polygon points="1000,637 900,707 1000,707" fill="#FF8A65" /> {/* Orange triangle bottom right */}
                    <rect x="990" y="357" width="10" height="150" fill="#4DB6AC" /> {/* Vertical bar teal */}
                    <rect x="850" y="697" width="150" height="10" fill="#4DB6AC" /> {/* Horizontal bar teal */}
                    <polygon points="1000,457 950,507 1000,407" fill="#FFCA28" /> {/* Yellow triangle top right of shapes */}
                    <polygon points="900,707 880,657 850,707" fill="#FFCA28" /> {/* Small yellow triangle bottom right */}

                    {/* Dashed lines / Dots (simplified with circles) */}
                    {Array.from({ length: 15 }).map((_, i) => (
                        <circle key={`dot-tl-${i}`} cx={20 + i * 15} cy={20 + i * 5} r="2" fill="#9CA3AF" opacity="0.6" />
                    ))}
                     {Array.from({ length: 10 }).map((_, i) => (
                        <circle key={`dot-br-${i}`} cx={980 - i * 15} cy={687 - i * 5} r="2" fill="#9CA3AF" opacity="0.6" />
                    ))}
                </svg>

                {/* Badge/Seal Element (SVG-based for better quality) */}
                <div className="absolute top-10 right-10 flex flex-col items-center justify-center" style={{ width: '100px', height: '100px', transform: 'rotate(15deg)' }}>
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#EF4444" /> {/* Red */}
                                <stop offset="100%" stopColor="#DC2626" /> {/* Darker Red */}
                            </linearGradient>
                            <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FBBF24" /> {/* Amber */}
                                <stop offset="100%" stopColor="#F59E0B" /> {/* Darker Amber */}
                            </linearGradient>
                        </defs>
                        {/* Ribbon Top */}
                        <path d="M 0 30 Q 10 20 20 30 L 30 0 L 40 30 Q 50 20 60 30 L 70 0 L 80 30 Q 90 20 100 30 L 100 40 Q 90 50 80 40 L 70 70 L 60 40 Q 50 50 40 40 L 30 70 L 20 40 Q 10 50 0 40 Z" fill="url(#ribbonGradient)" transform="scale(0.8) translate(10, -5)" />
                        {/* Main Circle */}
                        <circle cx="50" cy="50" r="40" fill="url(#circleGradient)" stroke="#FFFFFF" strokeWidth="2" />
                        {/* Text inside circle */}
                        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="bold">TM</text> {/* TypeMaster Abbreviation */}
                        <text x="50%" y="75%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">{year}</text> {/* Year */}
                        {/* Small Star/Dot in circle (optional, simplified) */}
                        <circle cx="50" cy="25" r="3" fill="white" />
                    </svg>
                     <span className="text-gray-700 font-bold text-lg mt-2 absolute bottom-0">Employee</span>
                </div>


                {/* Certificate Main Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-12 pb-16 pt-24 text-center">
                    <h1 className="text-6xl font-extrabold mb-2 text-gray-800 tracking-tight" style={{letterSpacing: '0.05em'}}>CERTIFICATE</h1>
                    <p className="text-3xl font-semibold mb-8 text-gray-600">OF APPRECIATION</p>
                    <p className="text-xl italic mb-4 text-gray-500">PRESENTED TO</p>

                    <p className="text-6xl font-bold text-blue-700 mb-10 border-b-4 border-blue-500 pb-2 px-12 w-fit"
                        style={{fontFamily: 'serif', letterSpacing: '0.02em'}} /* Using serif for name for a more formal look */
                    >
                        {userName || "John Vector"}
                    </p>

                    <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mb-8">
                        This certificate acknowledges the exceptional typing proficiency and dedication demonstrated by the recipient.
                    </p>
                     <p className="text-xl font-bold text-green-600 mb-8 mt-4">
                        Achieving a remarkable speed of <span className="text-3xl font-extrabold">{displayWPM} WPM</span> in a {displayDuration}-minute test!
                    </p>

                    {/* Signatures / Dates / Certificate No. */}
                    {/* Changed grid-cols-3 to grid-cols-2 and removed the Certificate No. column */}
                    <div className="grid grid-cols-2 gap-8 w-full max-w-xl mt-auto text-lg pt-4">
                        <div className="text-center flex flex-col items-center">
                            {/* Applied inline style for exact 5px padding */}
                            <p className="font-bold text-gray-800 border-b border-gray-400 w-full max-w-[150px]" style={{ paddingBottom: '5px' }}>{certificateDate}</p>
                            <p className="text-gray-500 text-sm mt-1">Date</p>
                        </div>
                         <div className="text-center flex flex-col items-center">
                            {/* Applied inline style for exact 5px padding */}
                            <p className="font-bold text-gray-800 border-b border-gray-400 w-full max-w-[150px]" style={{ paddingBottom: '5px' }}>TypeMaster</p>
                            <p className="text-gray-500 text-sm mt-1">Founder</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center">
                <button
                    onClick={() => handleDownloadCertificate('png')}
                    className={`${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
                >
                    Download as PNG
                </button>
                <button
                    onClick={() => handleDownloadCertificate('jpeg')}
                    className={`${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
                >
                    Download as JPG
                </button>
                <button
                    onClick={() => setStatusMessage('For PDF, please use your browser\'s Print function (Ctrl+P or Cmd+P) and select "Save as PDF" as the destination.')}
                    className={`${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-500 hover:bg-gray-600'} text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75`}
                >
                    Download as PDF (Browser Print)
                </button>
                <button
                    onClick={handleShareCertificate}
                    className={`${theme === 'dark' ? 'bg-purple-700 hover:bg-purple-800' : 'bg-purple-600 hover:bg-purple-700'} text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75`}
                >
                    Share Certificate
                </button>
            </div>
            <button
                onClick={onBack}
                className={`mt-4 ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'} text-gray-800 dark:text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out`}
            >
                Back to Timed Test Selection
            </button>
        </div>
    );
};

// --- App Component ---
const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedCategory, setSelectedCategory] = useState(null); // Will be string for category/level name
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [theme, setTheme] = useState('light'); // 'light' or 'dark'
    const [showConfetti, setShowConfetti] = useState(false); // Standard confetti
    const [showLongConfetti, setShowLongConfetti] = useState(false); // Long confetti for level mastery
    const [showMilestoneModal, setShowMilestoneModal] = useState(false);
    const [modalLevelData, setModalLevelData] = useState(null);
    const [timedTestResult, setTimedTestResult] = useState(null); // For passing WPM to certificate

    const [levelProgress, setLevelProgress] = useState(() => {
        const storedProgress = localStorage.getItem('levelProgress');
        if (storedProgress) {
            const parsed = JSON.parse(storedProgress);
            // Ensure array structure is maintained
            [...levels, ...programmerLevels].forEach(level => { // Keep tracking for both, even if programmer levels aren't shown on pathway
                if (!Array.isArray(parsed[level]) || parsed[level].length !== 100) {
                    parsed[level] = Array(100).fill(false);
                }
            });
            return parsed;
        }
        // Initialize all levels (general and programmer) with 100 false booleans
        const initialProgress = {};
        [...levels, ...programmerLevels].forEach(level => {
            initialProgress[level] = Array(100).fill(false);
        });
        return initialProgress;
    });

    // This state will hold results if we are showing a problematic key exercise
    const [problematicKeyExerciseInfo, setProblematicKeyExerciseInfo] = useState(null);

    // Save level progress to localStorage
    useEffect(() => {
        localStorage.setItem('levelProgress', JSON.stringify(levelProgress));
    }, [levelProgress]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const navigateTo = useCallback((page, category = null, index = 0) => {
        console.log(`Navigating to: ${page}, Category: ${category}, Index: ${index}`);
        setCurrentPage(page);
        setSelectedCategory(category);
        setCurrentExerciseIndex(index);
        setShowConfetti(false); // Reset confetti when navigating
        setShowLongConfetti(false); // Reset long confetti when navigating
        setProblematicKeyExerciseInfo(null); // Reset problematic key exercise info
        if (page !== 'certificate' && page !== 'timedTestResults') { // Only clear timedTestResult if not navigating to certificate or results page itself
            setTimedTestResult(null); // Reset timed test results
        }
    }, []);

    const handleSelectCategory = (category) => {
        navigateTo('typing', category, 0);
    };

    const handleBack = () => {
        console.log(`Back button clicked from: ${currentPage}`);
        if (currentPage === 'typing' || currentPage === 'results' || currentPage === 'pathway' || currentPage === 'programmerLevels' || currentPage === 'timedTest') {
            if (problematicKeyExerciseInfo) {
                navigateTo('results', problematicKeyExerciseInfo.originalResults, problematicKeyExerciseInfo.originalResults.originalExerciseIndex);
                setProblematicKeyExerciseInfo(null);
            } else if (currentPage === 'timedTest') {
                navigateTo('timedTestSelection');
            }
            else if (programmerLevels.includes(selectedCategory)) {
                navigateTo('programmerLevels');
            }
            else if (levels.includes(selectedCategory) && currentPage !== 'results') {
                navigateTo('levelSelection');
            } else if (!levels.includes(selectedCategory) && !programmerLevels.includes(selectedCategory) && currentPage !== 'results' && currentPage !== 'programmerLevels') {
                navigateTo('categorySelection');
            } else if (currentPage === 'results') {
                if (selectedCategory && (levels.includes(selectedCategory.currentCategory) || programmerLevels.includes(selectedCategory.currentCategory))) {
                    navigateTo('levelSelection');
                } else if (selectedCategory && !levels.includes(selectedCategory.currentCategory) && !programmerLevels.includes(selectedCategory.currentCategory)) {
                    navigateTo('categorySelection');
                } else {
                    navigateTo('home'); // Fallback if result context is lost
                }
            } else if (currentPage === 'timedTestResults') { // Corrected: If on timed test results, go back to test selection
                navigateTo('timedTestSelection');
            } else if (currentPage === 'certificate') { // Corrected: If on certificate, go back to timed test results
                navigateTo('timedTestResults');
            }
            else {
                navigateTo('home'); // Fallback to home
            }
        } else if (currentPage === 'timedTestResults') {
            navigateTo('timedTestSelection');
        } else if (currentPage === 'certificate') {
            navigateTo('timedTestResults'); // From certificate, go back to results summary
        } else if (currentPage === 'categorySelection' || currentPage === 'levelSelection' || currentPage === 'timedTestSelection') {
            navigateTo('home');
        } else {
            navigateTo('home'); // Final fallback
        }
    };

    const handleTestComplete = useCallback((normalWPM, netWPM, errors, keyErrors, currentCategoryFromTest, timeTakenSeconds, isProblematicPracticeFromTest) => {
        console.log(`Test completed! Raw Net WPM: ${netWPM}, Raw Time: ${timeTakenSeconds}`);
        console.log(`App: handleTestComplete called. Category: ${currentCategoryFromTest}, WPM: ${netWPM}, Time (s): ${timeTakenSeconds}`);
        // Show confetti immediately upon completion
        setShowConfetti(true);
        // Turn off confetti after 5 seconds (duration for general task completion)
        setTimeout(() => setShowConfetti(false), 5000); // Changed from 1500 to 5000
        
        // Identify problematic keys
        const sortedKeyErrors = Object.entries(keyErrors)
            .sort(([, countA], [, countB]) => countB - countA)
            .filter(([, count]) => count > 0);

        const topProblematicKeys = sortedKeyErrors.slice(0, 3).map(([key]) => key);

        // Update level progress if it's one of the main skill levels or programmer levels
        // Only update progress if it's NOT a problematic practice session and it's a regular level exercise
        if ((levels.includes(currentCategoryFromTest) || programmerLevels.includes(currentCategoryFromTest)) && !isProblematicPracticeFromTest) {
            setLevelProgress(prev => {
                const newProgress = { ...prev };
                // Mark the current exercise as completed
                if (newProgress[currentCategoryFromTest] && currentExerciseIndex < newProgress[currentCategoryFromTest].length) {
                    const updatedLevelArray = [...newProgress[currentCategoryFromTest]];
                    updatedLevelArray[currentExerciseIndex] = true;
                    newProgress[currentCategoryFromTest] = updatedLevelArray;
                }

                const completedCountForLevel = newProgress[currentCategoryFromTest].filter(Boolean).length;

                // Check for 100% completion for long confetti
                // Only trigger if it just reached 100 and wasn't 100 before
                if (completedCountForLevel === 100 && prev[currentCategoryFromTest].filter(Boolean).length < 100) {
                    setShowLongConfetti(true);
                    setTimeout(() => setShowLongConfetti(false), 30000); // 30 seconds for mastery confetti
                }
                return newProgress;
            });
        }

        // Delay navigation to results page slightly (1 second after test completion)
        setTimeout(() => {
            // For Timed Test, navigate to a new results summary page before certificate
            if (currentCategoryFromTest === 'Timed Test') {
                // Ensure WPM is a number, default to 0 if NaN
                const finalWPM = isNaN(netWPM) ? 0 : netWPM;
                const finalDuration = isNaN(timeTakenSeconds / 60) ? 0 : timeTakenSeconds / 60;
                console.log(`Setting Timed Test Result: WPM=${finalWPM}, Duration=${finalDuration}`);
                setTimedTestResult({ wpm: finalWPM, duration: finalDuration }); // Store for certificate
                navigateTo('timedTestResults');
            } else {
                navigateTo('results', { normalWPM, netWPM, errors, topProblematicKeys, currentCategory: currentCategoryFromTest, originalExerciseIndex: currentExerciseIndex, timeTakenSeconds });
            }
        }, 1000); // 1 second delay before navigating
    }, [navigateTo, currentExerciseIndex, levelProgress, setShowLongConfetti, setShowConfetti]);


    const openMilestoneModal = useCallback((levelName, progressArray) => { // Renamed progress to progressArray for clarity
        setModalLevelData({ levelName, progress: progressArray });
        setShowMilestoneModal(true);
    }, []);

    const closeMilestoneModal = useCallback(() => {
        setShowMilestoneModal(false);
        setModalLevelData(null);
    }, []);


    return (
        <div className={`min-h-screen flex font-sans antialiased text-gray-800 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
            <Confetti active={showConfetti} duration={5000} /> {/* Standard confetti duration changed to 5 seconds */}
            <Confetti active={showLongConfetti} duration={30000} /> {/* Long confetti */}

            {/* Sidebar */}
            <Sidebar navigateTo={navigateTo} currentPage={currentPage} theme={theme} toggleTheme={toggleTheme} selectedCategory={selectedCategory} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col p-6 sm:p-8 lg:p-10">
                {/* Back Button - Visible only on specific pages */}
                {(currentPage === 'categorySelection' || currentPage === 'levelSelection' || currentPage === 'typing' || currentPage === 'results' || currentPage === 'pathway' || currentPage === 'programmerLevels' || currentPage === 'timedTestSelection' || currentPage === 'timedTest' || currentPage === 'certificate' || currentPage === 'timedTestResults') && (
                    <div className="mb-4">
                        <button
                            onClick={handleBack}
                            className={`${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
                        >
                            ← Back
                        </button>
                    </div>
                )}

                {/* Page Content */}
                <div className="flex-grow flex items-center justify-center">
                    <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-xl w-full max-w-4xl border`}>
                        {console.log(`App: Current page is ${currentPage}. timedTestResult state is: ${timedTestResult ? 'object' : 'null'}`)}
                        {currentPage === 'home' && (
                            <div className="text-center">
                                <h1 className={`text-4xl font-extrabold mb-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>Welcome to TypeMaster!</h1>
                                <p className={`text-lg mb-8 max-w-prose mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Improve your keyboard speed and accuracy with engaging exercises. Select a level or category from the sidebar to begin your typing journey.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={() => navigateTo('levelSelection')}
                                        className={`${theme === 'dark' ? 'bg-green-700 hover:bg-green-800' : 'bg-green-600 hover:bg-green-700'} text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75`}
                                    >
                                        Start Level Training
                                    </button>
                                    <button
                                        onClick={() => navigateTo('categorySelection')}
                                        className={`${theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-800' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75`}
                                    >
                                        Browse Categories
                                    </button>
                                    <button
                                        onClick={() => navigateTo('programmerLevels')}
                                        className={`${theme === 'dark' ? 'bg-yellow-700 hover:bg-yellow-800' : 'bg-yellow-600 hover:bg-yellow-700'} text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75`}
                                    >
                                        Programmer Mode
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentPage === 'levelSelection' && (
                            <LevelSelection onSelectLevel={handleSelectCategory} levels={levels} theme={theme} />
                        )}

                        {currentPage === 'categorySelection' && (
                            <CategorySelection onSelectCategory={handleSelectCategory} categories={Object.keys(exerciseData).filter(cat => ![...levels, ...programmerLevels].includes(cat))} theme={theme} />
                        )}

                        {currentPage === 'programmerLevels' && (
                             <LevelSelection onSelectLevel={handleSelectCategory} levels={programmerLevels} theme={theme} title="Choose a Programmer Level" />
                        )}

                        {currentPage === 'timedTestSelection' && (
                            <TimedTestSelection onSelectDuration={(duration) => navigateTo('timedTest', 'Timed Test', duration)} theme={theme} />
                        )}

                        {currentPage === 'timedTest' && selectedCategory === 'Timed Test' && (
                            <TypingTest // Changed from TimedTypingTest to TypingTest
                                // Pass 'Timed Test' as the category for onTestComplete to differentiate it
                                onTestComplete={(normalWPM, netWPM, errors, keyErrors, timeTakenSeconds) =>
                                    handleTestComplete(normalWPM, netWPM, errors, keyErrors, 'Timed Test', timeTakenSeconds, false)
                                }
                                theme={theme}
                                testDuration={currentExerciseIndex} // currentExerciseIndex stores the duration in minutes
                                setShowConfetti={setShowConfetti}
                                exercises={generalTexts.flatMap(text => text.split('. ').map(s => s.trim()).filter(s => s.length > 0))} // Provide some exercises
                                initialExerciseIndex={0}
                            />
                        )}

                        {currentPage === 'typing' && selectedCategory && (
                            <TypingTest
                                exercises={problematicKeyExerciseInfo ? [problematicKeyExerciseInfo.exercise] : exerciseData[selectedCategory]}
                                initialExerciseIndex={problematicKeyExerciseInfo ? 0 : currentExerciseIndex}
                                onTestComplete={(normalWPM, netWPM, errors, keyErrors, timeTakenSeconds, isProblematicPracticeFromTestParam) => // Added parameter
                                    handleTestComplete(normalWPM, netWPM, errors, keyErrors, selectedCategory, timeTakenSeconds, isProblematicPracticeFromTestParam)
                                }
                                onNextExercise={(nextIndex) => setCurrentExerciseIndex(nextIndex)}
                                theme={theme}
                                isProblematicPractice={!!problematicKeyExerciseInfo}
                                setShowConfetti={setShowConfetti} // Pass confetti setter
                            />
                        )}

                        {currentPage === 'results' && typeof selectedCategory === 'object' && ( // selectedCategory now holds result object
                            <Result
                                normalWPM={selectedCategory.normalWPM}
                                netWPM={selectedCategory.netWPM}
                                errors={selectedCategory.errors}
                                topProblematicKeys={selectedCategory.topProblematicKeys}
                                onTryAgain={() => navigateTo('typing', selectedCategory.currentCategory, selectedCategory.originalExerciseIndex)}
                                onNewExercise={() => {
                                    if (levels.includes(selectedCategory.currentCategory)) navigateTo('levelSelection');
                                    else if (programmerLevels.includes(selectedCategory.currentCategory)) navigateTo('programmerLevels');
                                    else navigateTo('categorySelection');
                                }}
                                onPracticeProblematicKeys={(keys) => {
                                    const problematicExercise = generateProblematicKeyExercise(keys);
                                    setProblematicKeyExerciseInfo({ exercise: problematicExercise, originalResults: selectedCategory });
                                    navigateTo('typing', selectedCategory.currentCategory, 0); // Reuse typing page, but with specific exercise
                                }}
                                theme={theme}
                                currentCategory={selectedCategory.currentCategory} // Pass current category
                                originalExerciseIndex={selectedCategory.originalExerciseIndex} // Pass original index
                                totalExercisesInLevel={exerciseData[selectedCategory.currentCategory]?.length || 0} // Pass total exercises
                                onNextExercise={() => navigateTo('typing', selectedCategory.currentCategory, selectedCategory.originalExerciseIndex + 1)} // Pass next exercise handler
                                isProblematicPractice={selectedCategory.isProblematicPractice} // Pass this state down
                            />
                        )}

                        {currentPage === 'timedTestResults' && timedTestResult && (
                            <TimedTestResultsPage
                                wpm={timedTestResult.wpm}
                                duration={timedTestResult.duration}
                                onGenerateCertificate={() => navigateTo('certificate')}
                                onTryAnotherTest={() => navigateTo('timedTestSelection')}
                                theme={theme}
                            />
                        )}

                        {currentPage === 'certificate' && timedTestResult && (
                            <CertificateGenerator
                                wpm={timedTestResult.wpm}
                                duration={timedTestResult.duration}
                                theme={theme}
                                onBack={() => navigateTo('timedTestResults')}
                            />
                        )}

                        {currentPage === 'pathway' && (
                            <ProgressPathway
                                levelProgress={levelProgress}
                                levels={[
                                    ...levels, // Keep general levels
                                    ...programmerLevels // Include all programmer levels here so they are available for filtering
                                ]}
                                theme={theme}
                                onLevelClick={openMilestoneModal}
                            />
                        )}
                    </div>
                </div>
            </div>
            {showMilestoneModal && modalLevelData && (
                <MilestoneModal
                    levelName={modalLevelData.levelName}
                    progress={modalLevelData.progress} // This is the boolean array now
                    onClose={closeMilestoneModal}
                    theme={theme}
                />
            )}
        </div>
    );
};

// --- Sidebar Component ---
const Sidebar = ({ navigateTo, currentPage, theme, toggleTheme, selectedCategory }) => {
    const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-300';
    const hoverColor = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-700';
    const activeBg = theme === 'dark' ? 'bg-blue-700' : 'bg-blue-600';
    const activeText = 'text-white shadow-inner';

    // Determine the actual category name for highlighting
    const currentCategoryName = currentPage === 'results' && typeof selectedCategory === 'object'
        ? selectedCategory.currentCategory
        : selectedCategory;

    return (
        <div className={`w-64 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-800'} text-white p-6 rounded-r-2xl shadow-lg flex flex-col justify-between`}>
            <div>
                <h2 className={`text-3xl font-extrabold mb-8 text-center ${theme === 'dark' ? 'text-blue-400' : 'text-blue-300'}`}>TypeMaster</h2>
                <nav>
                    <ul className="space-y-4">
                        <li>
                            <button
                                onClick={() => navigateTo('home')}
                                className={`block w-full text-left py-3 px-4 rounded-xl transition-colors duration-200 ${
                                    currentPage === 'home' ? `${activeBg} ${activeText}` : `${hoverColor} ${textColor}`
                                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
                            >
                                Home
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigateTo('levelSelection')}
                                className={`block w-full text-left py-3 px-4 rounded-xl transition-colors duration-200 ${
                                    currentPage === 'levelSelection' || (levels.includes(currentCategoryName) && (currentPage === 'typing' || currentPage === 'results'))
                                        ? `${activeBg} ${activeText}` : `${hoverColor} ${textColor}`
                                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
                            >
                                Levels
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigateTo('categorySelection')}
                                className={`block w-full text-left py-3 px-4 rounded-xl transition-colors duration-200 ${
                                    (!levels.includes(currentCategoryName) && !programmerLevels.includes(currentCategoryName) && (currentPage === 'typing' || currentPage === 'results')) || currentPage === 'categorySelection'
                                        ? `${activeBg} ${activeText}` : `${hoverColor} ${textColor}`
                                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
                            >
                                Categories
                            </button>
                        </li>
                         <li>
                            <button
                                onClick={() => navigateTo('programmerLevels')}
                                className={`block w-full text-left py-3 px-4 rounded-xl transition-colors duration-200 ${
                                    currentPage === 'programmerLevels' || (programmerLevels.includes(currentCategoryName) && (currentPage === 'typing' || currentPage === 'results'))
                                        ? `${activeBg} ${activeText}` : `${hoverColor} ${textColor}`
                                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
                            >
                                Programmer Mode
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigateTo('timedTestSelection')}
                                className={`block w-full text-left py-3 px-4 rounded-xl transition-colors duration-200 ${
                                    currentPage === 'timedTestSelection' || currentPage === 'timedTest' || currentPage === 'certificate' || currentPage === 'timedTestResults'
                                        ? `${activeBg} ${activeText}` : `${hoverColor} ${textColor}`
                                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
                            >
                                Typing Test
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigateTo('pathway')}
                                className={`block w-full text-left py-3 px-4 rounded-xl transition-colors duration-200 ${
                                    currentPage === 'pathway' ? `${activeBg} ${activeText}` : `${hoverColor} ${textColor}`
                                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
                            >
                                My Progress
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="mt-8 text-sm text-gray-400 text-center">
                <p>&copy; 2025 TypeMaster.</p>
            </div>
        </div>
    );
};

// --- LevelSelection Component ---
const LevelSelection = ({ onSelectLevel, levels, theme, title = "Choose a Level" }) => {
    return (
        <div className="text-center">
            <h2 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {levels.map((level) => (
                    <button
                        key={level}
                        onClick={() => onSelectLevel(level)}
                        className={`${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
                    >
                        {level}
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- CategorySelection Component ---
const CategorySelection = ({ onSelectCategory, categories, theme }) => {
    return (
        <div className="text-center">
            <h2 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Browse Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`${theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-800' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- TimedTestSelection Component ---
const TimedTestSelection = ({ onSelectDuration, theme }) => {
    const durations = [1, 3, 5]; // Durations in minutes: 1, 3, 5

    return (
        <div className="text-center">
            <h2 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Select Test Duration</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {durations.map((duration) => (
                    <button
                        key={duration}
                        onClick={() => onSelectDuration(duration)}
                        className={`${theme === 'dark' ? 'bg-teal-700 hover:bg-teal-800' : 'bg-teal-600 hover:bg-teal-700'} text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75`}
                    >
                        {duration} Minute{duration > 1 ? 's' : ''}
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- TypingTest Component (Renamed from TimedTypingTest to be more generic) ---
const TypingTest = ({ exercises, initialExerciseIndex, onTestComplete, onNextExercise, theme, isProblematicPractice = false, setShowConfetti, testDuration = null }) => {
    const [currentExerciseText, setCurrentExerciseText] = useState('');
    const [typedText, setTypedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [errors, setErrors] = useState(0);
    const startTime = useRef(null); // Changed to useRef
    const [endTime, setEndTime] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [keyErrors, setKeyErrors] = useState({}); // To track errors per key
    const inputRef = useRef(null);
    const textContainerRef = useRef(null);
    const [lastPressedKey, setLastPressedKey] = useState(null);
    const timerIntervalRef = useRef(null); // Ref for timer interval
    const wpmIntervalRef = useRef(null); // Ref for WPM calculation interval
    const [timeLeft, setTimeLeft] = useState(testDuration ? testDuration * 60 : null);
    const [currentWPM, setCurrentWPM] = useState(0);
    const isTimed = testDuration !== null;

    // IMPORTANT: Define resetTest before its usage in useEffect
    const resetTest = useCallback(() => {
        setTypedText('');
        setCurrentIndex(0);
        setErrors(0);
        startTime.current = null; // Reset ref value
        setEndTime(null);
        setShowResults(false);
        setKeyErrors({});
        setLastPressedKey(null);
        setCurrentWPM(0);
        if (isTimed) {
            setTimeLeft(testDuration * 60);
        }
        
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }
        if (wpmIntervalRef.current) {
            clearInterval(wpmIntervalRef.current);
        }
        inputRef.current?.focus(); // Focus on reset
        setShowConfetti(false); // Reset confetti on new test
    }, [isTimed, testDuration, setShowConfetti]);


    // Define handleTestEnd first, before other effects/callbacks that use it
    const handleTestEnd = useCallback((finalTypedText, finalExerciseText, finalErrors, finalKeyErrors, isTimedCompletion) => {
        clearInterval(timerIntervalRef.current);
        clearInterval(wpmIntervalRef.current);
        const actualEndTime = new Date();
        setEndTime(actualEndTime);

        const timeTakenSeconds = (actualEndTime.getTime() - startTime.current.getTime()) / 1000;
        
        let correctChars = 0;
        let totalTypedChars = finalTypedText.length;
        let calculatedErrors = 0;

        for (let i = 0; i < totalTypedChars; i++) {
            if (i < finalExerciseText.length) {
                if (finalTypedText[i] === finalExerciseText[i]) {
                    correctChars++;
                } else {
                    calculatedErrors++;
                }
            } else {
                // If typed characters exceed exercise text length, count as error
                calculatedErrors++;
            }
        }

        // Calculate WPM: (correct characters / 5) / (time in minutes)
        // Ensure timeTakenSeconds is not zero to prevent division by zero
        const effectiveTimeInMinutes = isTimedCompletion ? testDuration : Math.max(timeTakenSeconds / 60, 0.01);

        const normalWPM = Math.round((totalTypedChars / 5) / effectiveTimeInMinutes);
        const netWPM = Math.round((correctChars / 5) / effectiveTimeInMinutes);

        setShowResults(true);
        onTestComplete(normalWPM, netWPM, calculatedErrors, finalKeyErrors, timeTakenSeconds, isProblematicPractice);
    }, [onTestComplete, isProblematicPractice, testDuration, startTime]); // startTime (ref) is a stable identity, so its inclusion here is safe


    useEffect(() => {
        if (exercises && exercises.length > 0) {
            let textToSet = exercises[initialExerciseIndex];
            if (isTimed) { // If it's a timed test, generate a longer text
                let fullText = '';
                let targetWordCount;

                if (testDuration === 1) {
                    targetWordCount = 150 * 1 * 2;
                } else if (testDuration === 3) {
                    targetWordCount = 150 * 3 * 2;
                } else {
                    targetWordCount = 150 * 5 * 2;
                }
                let currentWordCount = 0;
                while (currentWordCount < targetWordCount) {
                    fullText += generalTexts[Math.floor(Math.random() * generalTexts.length)] + " ";
                    currentWordCount = getWordCount(fullText);
                }
                textToSet = fullText.trim();
            }
            setCurrentExerciseText(textToSet);
            resetTest();
        }
    }, [exercises, initialExerciseIndex, isTimed, testDuration, resetTest]);


    // Timer logic for timed tests
    useEffect(() => {
        if (isTimed && startTime.current && timeLeft > 0) { // Check startTime.current
            timerIntervalRef.current = setInterval(() => {
                const elapsed = (new Date().getTime() - startTime.current.getTime()) / 1000; // Access .current
                const remaining = (testDuration * 60) - elapsed;
                if (remaining <= 0) {
                    setTimeLeft(0);
                    clearInterval(timerIntervalRef.current);
                    handleTestEnd(typedText, currentExerciseText, errors, keyErrors, true); // true indicates timed test completion
                } else {
                    setTimeLeft(Math.round(remaining));
                }
            }, 1000);
        } else if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }

        return () => {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        };
    }, [isTimed, startTime.current, timeLeft, testDuration, typedText, currentExerciseText, errors, keyErrors, handleTestEnd]); // Added handleTestEnd to dependencies

    // Real-time WPM calculation for ALL tests
    useEffect(() => {
        // This effect should run as soon as typing starts (startTime is set)
        // regardless of whether it's a timed test or not.
        if (startTime.current) {
            wpmIntervalRef.current = setInterval(() => {
                const timeElapsed = (new Date().getTime() - startTime.current.getTime()) / 1000;
                if (timeElapsed > 0) {
                    const currentGrossWPM = Math.round((typedText.length / 5) / (timeElapsed / 60));
                    setCurrentWPM(currentGrossWPM);
                }
            }, 1000); // Update WPM every second
        } else if (wpmIntervalRef.current) {
            clearInterval(wpmIntervalRef.current);
        }
        return () => {
            if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
        };
    }, [startTime.current, typedText.length]); // Dependencies for WPM update


    const handleChange = useCallback((event) => {
        if (!startTime.current) { // Check startTime.current
            startTime.current = new Date(); // Store initial startTime in ref
        }
        if (isTimed && timeLeft === 0) return; // Prevent typing if timed test is over

        const newTypedText = event.target.value;
        const newKeyErrors = { ...keyErrors };
        let currentErrorCount = 0;

        // Compare typed text with exercise text character by character
        for (let i = 0; i < newTypedText.length; i++) {
            if (i < currentExerciseText.length) {
                if (newTypedText[i] !== currentExerciseText[i]) {
                    currentErrorCount++;
                    // Track key errors only when a new incorrect character is typed
                    if (i === newTypedText.length - 1 && typedText.length < newTypedText.length) {
                         const charWithError = currentExerciseText[i];
                         newKeyErrors[charWithError] = (newKeyErrors[charWithError] || 0) + 1;
                    }
                }
            } else {
                // Typed beyond the given text is an error
                currentErrorCount++;
                if (i === newTypedText.length - 1 && typedText.length < newTypedText.length) {
                    newKeyErrors['extra'] = (newKeyErrors['extra'] || 0) + 1;
                }
            }
        }
        setErrors(currentErrorCount);
        setKeyErrors(newKeyErrors);
        setTypedText(newTypedText);
        setCurrentIndex(newTypedText.length);

        // Force cursor to the end
        if (inputRef.current) {
            inputRef.current.selectionStart = newTypedText.length;
            inputRef.current.selectionEnd = newTypedText.length;
        }

        // Auto-scroll logic
        if (textContainerRef.current) {
            const spanElement = textContainerRef.current.children[newTypedText.length];
            if (spanElement) {
                const containerRect = textContainerRef.current.getBoundingClientRect();
                const spanRect = spanElement.getBoundingClientRect();

                // Scroll if the current character is out of view (either below or above)
                if (spanRect.bottom > containerRect.bottom || spanRect.top < containerRect.top) {
                    spanElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        }

        // If not a timed test, check for completion
        if (!isTimed && newTypedText.length === currentExerciseText.length) {
            handleTestEnd(newTypedText, currentExerciseText, currentErrorCount, newKeyErrors, false);
        }
    }, [startTime, currentExerciseText, typedText, keyErrors, isTimed, timeLeft, handleTestEnd]);


    const handleKeyDown = useCallback((event) => {
        setLastPressedKey(event.key);
        // Prevent default behavior for 'Tab' to keep focus on textarea in code snippets
        if (event.key === 'Tab') {
            event.preventDefault();
            // Manually insert a tab character
            const { selectionStart, selectionEnd } = inputRef.current;
            const newText = typedText.substring(0, selectionStart) + '\t' + typedText.substring(selectionEnd);
            setTypedText(newText);
            // Move cursor after the inserted tab
            setTimeout(() => {
                inputRef.current.selectionStart = inputRef.current.selectionEnd = selectionStart + 1;
            }, 0);
        }
    }, [typedText]);

    const handleKeyUp = useCallback(() => {
        setTimeout(() => setLastPressedKey(null), 100);
    }, []);

    const handleMouseDown = useCallback((event) => {
        // Prevent default behavior for mouse down to avoid temporary cursor placement
        event.preventDefault();
        if (inputRef.current) {
            inputRef.current.focus(); // Ensure it regains focus
            inputRef.current.selectionStart = typedText.length;
            inputRef.current.selectionEnd = typedText.length;
        }
    }, [typedText]);

    const renderExerciseText = () => {
        return currentExerciseText.split('').map((char, index) => {
            let className = '';
            if (index < typedText.length) {
                if (typedText[index] === char) {
                    className = 'text-green-600';
                } else {
                    className = 'text-red-600 bg-red-100 rounded-sm';
                }
            } else if (index === typedText.length && (isTimed ? timeLeft > 0 : !showResults)) { // Cursor only if time is left or not yet finished
                className = `border-b-2 ${theme === 'dark' ? 'border-blue-400' : 'border-blue-500'}`;
            }
            if (char === '\n') {
                return <br key={index} />; // Render newline as <br>
            }
            return (
                <span key={index} className={className}>
                    {char}
                </span>
            );
        });
    };

    const textColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';
    const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
    const bgColor = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50';
    const inputBorder = theme === 'dark' ? 'border-blue-400' : 'border-blue-300';
    const inputFocus = theme === 'dark' ? 'focus:ring-blue-400' : 'focus:ring-blue-500';


    return (
        <div className={`flex flex-col items-center p-6 rounded-2xl shadow-xl w-full max-w-3xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-3xl font-bold mb-6 ${textColor}`}>
                {isTimed ? `Timed Typing Test (${testDuration} Minute${testDuration > 1 ? 's' : ''})` : `Typing Exercise ${initialExerciseIndex + 1}`}
            </h2>

            <div className="flex justify-between w-full mb-6 text-xl font-semibold">
                {isTimed && (
                    <span className={textColor}>Time Left: <span className={`${timeLeft <= 10 ? 'text-red-500' : (theme === 'dark' ? 'text-blue-400' : 'text-blue-600')}`}>{Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</span></span>
                )}
                <span className={textColor}>Speed: <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{currentWPM} WPM</span></span>
                <span className={textColor}>Errors: <span className={`${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>{errors}</span></span>
            </div>

            <div
                ref={textContainerRef}
                className={`p-6 ${borderColor} rounded-xl ${bgColor} mb-8 text-2xl leading-relaxed text-left w-full h-40 overflow-y-auto whitespace-pre-wrap tracking-wide ${textColor} font-mono`}
            >
                {renderExerciseText()}
            </div>

            <textarea
                ref={inputRef}
                value={typedText}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onMouseDown={handleMouseDown} // Add the onMouseDown handler
                readOnly={showResults || (isTimed && timeLeft === 0)}
                className={`w-full p-4 border-2 ${inputBorder} rounded-lg focus:outline-none focus:ring-2 ${inputFocus} text-xl resize-none font-mono tracking-wide ${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'}`}
                rows="4"
                placeholder={showResults || (isTimed && timeLeft === 0) ? "Test complete! See your results." : "Start typing here..."}
                style={{ caretColor: (theme === 'dark' ? '#60A5FA' : 'blue') }}
            ></textarea>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button
                    onClick={resetTest}
                    className={`${theme === 'dark' ? 'bg-purple-700 hover:bg-purple-800' : 'bg-purple-600 hover:bg-purple-700'} text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75`}
                >
                    Reset Test
                </button>
            </div>
            <VirtualKeyboard keyPressed={lastPressedKey} />
        </div>
    );
};


// --- TimedTestResultsPage Component ---
const TimedTestResultsPage = ({ wpm, duration, onGenerateCertificate, onTryAnotherTest, theme }) => {
    const textColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';

    const motivateMessages = [
        "Great job! Your typing speed is impressive!",
        "Excellent performance! Keep up the practice.",
        "You're a typing star! Want to make it official?",
        "Fantastic speed! Let's get that certificate!"
    ];
    const motivationMessage = motivateMessages[Math.floor(Math.random() * motivateMessages.length)];


    return (
        <div className={`flex flex-col items-center text-center p-6 rounded-2xl shadow-xl w-full max-w-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-4xl font-extrabold mb-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>Test Complete!</h2>
            <p className={`text-lg mb-8 ${textColor}`}>{motivationMessage}</p>

            <div className={`${theme === 'dark' ? 'bg-green-900 border-green-700' : 'bg-green-100 border-green-200'} p-6 rounded-xl shadow-inner border mb-8 w-full`}>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-300' : 'text-green-800'}`}>Your Speed:</p>
                <p className={`text-6xl font-extrabold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'} mt-2`}>{wpm} WPM</p>
                <p className={`text-lg ${theme === 'dark' ? 'text-green-300' : 'text-green-800'} mt-2`}>in a {duration}-minute test</p>
            </div>

            <p className={`text-xl font-semibold mb-6 ${textColor}`}>Do you need a TypeMaster Certification?</p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button
                    onClick={onGenerateCertificate}
                    className={`${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
                >
                    Yes, Get My Certificate!
                </button>
                <button
                    onClick={onTryAnotherTest}
                    className={`${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'} text-gray-800 dark:text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out`}
                >
                    No, Try Another Test
                </button>
            </div>
        </div>
    );
};


// --- Result Component ---
const Result = ({ normalWPM, netWPM, errors, topProblematicKeys, onTryAgain, onNewExercise, onPracticeProblematicKeys, theme, currentCategory, originalExerciseIndex, totalExercisesInLevel, onNextExercise, isProblematicPractice }) => {
    const textColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';

    const motivateMessages = [
        "Congratulations! You crushed it!",
        "Fantastic work! Every completed exercise makes you faster.",
        "Amazing! You're making significant progress!",
        "Excellent! Keep up this momentum!",
        "You're a typing superstar! Time for the next challenge?",
        "Brilliant! Your fingers are flying!",
        "Well done! The keyboard is your canvas!"
    ];
    const motivationMessage = motivateMessages[Math.floor(Math.random() * motivateMessages.length)];

    const nextExerciseAvailable = !isProblematicPractice && (originalExerciseIndex + 1) < totalExercisesInLevel;

    return (
        <div className={`flex flex-col items-center text-center p-6 rounded-2xl shadow-xl w-full max-w-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-4xl font-extrabold mb-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>Test Results!</h2>
            <p className={`text-lg mb-8 ${textColor}`}>{motivationMessage}</p> {/* Moved motivation up */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
                <div className={`${theme === 'dark' ? 'bg-blue-900 border-blue-700' : 'bg-blue-100 border-blue-200'} p-6 rounded-xl shadow-inner border`}>
                    <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>Normal WPM</p>
                    <p className={`text-5xl font-extrabold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} mt-2`}>{normalWPM}</p>
                </div>
                <div className={`${theme === 'dark' ? 'bg-green-900 border-green-700' : 'bg-green-100 border-green-200'} p-6 rounded-xl shadow-inner border`}>
                    <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-300' : 'text-green-800'}`}>Net WPM</p>
                    <p className={`text-5xl font-extrabold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'} mt-2`}>{netWPM}</p>
                </div>
                <div className={`${theme === 'dark' ? 'bg-red-900 border-red-700' : 'bg-red-100 border-red-200'} p-6 rounded-xl shadow-inner border`}>
                    <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-red-300' : 'text-red-800'}`}>Errors</p>
                    <p className={`text-5xl font-extrabold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'} mt-2`}>{errors}</p>
                </div>
            </div>

            {topProblematicKeys && topProblematicKeys.length > 0 && (
                <div className={`mb-6 p-4 rounded-xl ${theme === 'dark' ? 'bg-yellow-900 border-yellow-700' : 'bg-yellow-100 border-yellow-200'} border w-full text-lg ${theme === 'dark' ? 'text-yellow-200' : 'text-yellow-800'}`}>
                    <p className="font-semibold mb-2">Problematic Keys for Review:</p>
                    <p className="text-2xl font-bold tracking-widest">{topProblematicKeys.join(', ').toUpperCase()}</p>
                    <button
                        onClick={() => onPracticeProblematicKeys(topProblematicKeys)}
                        className={`${theme === 'dark' ? 'bg-yellow-700 hover:bg-yellow-800' : 'bg-yellow-500 hover:bg-yellow-600'} text-white font-semibold py-2 px-4 mt-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75`}
                    >
                        Practice These Keys
                    </button>
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                {nextExerciseAvailable ? (
                    <button
                        onClick={onNextExercise}
                        className={`${theme === 'dark' ? 'bg-green-700 hover:bg-green-800' : 'bg-green-600 hover:bg-green-700'} text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75`}
                    >
                        Continue to Next Exercise
                    </button>
                ) : (
                    <button
                        onClick={onTryAgain}
                        className={`${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
                    >
                        Try Exercise Again
                    </button>
                )}
                <button
                    onClick={onNewExercise}
                    className={`${theme === 'dark' ? 'bg-purple-700 hover:bg-purple-800' : 'bg-purple-600 hover:bg-purple-700'} text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75`}
                >
                    Select New Exercise
                </button>
            </div>
        </div>
    );
};

// Helper to generate an exercise focused on problematic keys
const generateProblematicKeyExercise = (keys, length = 150) => {
    if (!keys || keys.length === 0) {
        return "No problematic keys identified. Practice general exercises!";
    }
    let exercise = "";
    while (exercise.length < length) {
        exercise += keys[Math.floor(Math.random() * keys.length)];
        if (exercise.length % 5 === 0 && exercise.length < length) { // Add spaces to simulate words
            exercise += " ";
        }
    }
    return exercise.substring(0, length).trim();
};


// --- ProgressPathway Component ---
const ProgressPathway = ({ levelProgress, levels, theme, onLevelClick }) => {
    const progressText = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';
    const stepLabelColor = 'text-white'; // Set to white for text inside colored circles

    // Helper function for consistent colors based on level type
    const getLevelColor = useCallback((levelName) => {
        // These arrays are for internal mapping to colors, they are not the 'levels' prop itself
        const generalLevelsInOrder = ["Beginner", "Intermediate", "Advanced", "Pro", "Master"];
        const programmerLevelsInOrder = ["Basic Syntax", "Data Structures", "Web Dev Snippets", "SQL & Git"];

        if (generalLevelsInOrder.includes(levelName)) {
            const generalColors = ["#60A5FA", "#818CF8", "#C084FC", "#EC4899", "#F472B6"]; // Blue, Indigo, Purple, Pink, Rose
            return generalColors[generalLevelsInOrder.indexOf(levelName)] || "#60A5FA";
        } else if (programmerLevelsInOrder.includes(levelName)) {
            const programmerColors = ["#34D399", "#10B981", "#059669", "#047857"]; // Teal, Green, Dark Green, Emerald
            return programmerColors[programmerLevelsInOrder.indexOf(levelName)] || "#34D399";
        }
        return "#9CA3AF"; // Default grey
    }, []); // No dependencies as these arrays are static

    // Defines the points for the SVG path and corresponding level labels
    const getPathData = useCallback(() => {
        // Filter out specific programmer levels as requested by the user for the pathway visualization
        const visiblePathwayLevels = levels; // All levels are now visible on the pathway again.

        const pathPoints = [];
        const startX = 100;
        const startY = 50;
        const hStep = 200; // Horizontal step
        const vStep = 150; // Vertical step
        const cols = 2; // Number of columns for the levels

        // Add Start point
        pathPoints.push({ x: startX, y: startY, label: "Start", type: "special", emoji: "🏁", color: "#F59E0B" });

        // Add all skill levels (general and programmer)
        visiblePathwayLevels.forEach((levelName, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            
            // Simple grid layout, alternating direction for visual flow
            let itemX, itemY;
            if (row % 2 === 0) { // Even row: left to right
                itemX = startX + hStep + (col * hStep);
            } else { // Odd row: right to left
                itemX = startX + hStep + ((cols - 1) * hStep) - (col * hStep);
            }
            itemY = startY + vStep + (row * vStep); // Start levels below the "Start" point

            pathPoints.push({ x: itemX, y: itemY, label: levelName, type: "level", color: getLevelColor(levelName) });
        });

        // Add Mastery point after all levels
        const lastLevelPoint = pathPoints[pathPoints.length - 1];
        pathPoints.push({ x: lastLevelPoint.x, y: lastLevelPoint.y + vStep, label: "Mastery!", type: "special", emoji: "🏆", color: "#EC4899" });

        // Calculate SVG dimensions and adjusted points
        const minX = Math.min(...pathPoints.map(p => p.x));
        const maxX = Math.max(...pathPoints.map(p => p.x));
        const minY = Math.min(...pathPoints.map(p => p.y));
        const maxY = Math.max(...pathPoints.map(p => p.y));

        const padding = 70;
        const svgWidth = (maxX - minX) + 2 * padding;
        const svgHeight = (maxY - minY) + 2 * padding;

        const adjustedPoints = pathPoints.map(p => ({
            ...p,
            x: p.x - minX + padding,
            y: p.y - minY + padding
        }));

        let pathD = `M ${adjustedPoints[0].x},${adjustedPoints[0].y}`;
        for (let i = 1; i < adjustedPoints.length; i++) {
            const curr = adjustedPoints[i];
            pathD += ` L ${curr.x},${curr.y}`;
        }

        return { pathD, points: adjustedPoints, svgWidth, svgHeight };
    }, [levels, getLevelColor]);

    const { pathD, points, svgWidth, svgHeight } = getPathData();


    return (
        <div className="text-center p-4 w-full">
            <h2 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>My Progress Pathway</h2>
            <p className={`text-lg mb-8 ${progressText}`}>Embark on your typing journey! Each step on the path represents a level, with 100 exercises to master it.</p>

            <div className="relative mx-auto" style={{ width: svgWidth, height: svgHeight, maxWidth: '100%' }}>
                <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="absolute top-0 left-0">
                    <path
                        d={pathD}
                        fill="none"
                        stroke={theme === 'dark' ? '#4B5563' : '#D1D5DB'} // Gray path color
                        strokeWidth="30"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#shadow)" // Apply shadow filter
                    />
                    {/* Define shadow filter */}
                    <filter id="shadow">
                        <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="rgba(0,0,0,0.3)"/>
                    </filter>
                </svg>

                {points.map((point, index) => {
                    const levelName = point.label;
                    // Check against original, unfiltered programmerLevels to get actual progress
                    const isGeneralLevel = levels.includes(levelName);
                    const isProgrammerLevel = programmerLevels.includes(levelName); 

                    let currentLevelProgressCount = 0;
                    let levelDataForModal = null; // Data to pass to modal

                    if (isGeneralLevel || isProgrammerLevel) {
                         // levelProgress[levelName] is now an array of booleans
                         currentLevelProgressCount = levelProgress[levelName]?.filter(Boolean).length || 0; // Use optional chaining and default to 0
                         levelDataForModal = levelProgress[levelName]; // Pass the whole array
                    }

                    const isCompleted = (isGeneralLevel || isProgrammerLevel) ? currentLevelProgressCount >= 100 : false;
                    let backgroundColor = point.color; // Use defined color from point data

                    if (!isCompleted && (isGeneralLevel || isProgrammerLevel) && currentLevelProgressCount === 0) {
                         backgroundColor = theme === 'dark' ? '#4B5563' : '#9CA3AF'; // Grey for not started
                    } else if (!isCompleted && (isGeneralLevel || isProgrammerLevel) && currentLevelProgressCount > 0) {
                         backgroundColor = point.color;
                    } else if (isCompleted) {
                        backgroundColor = '#10B981'; // Green for truly completed levels
                    }


                    return (
                        <button
                            key={index}
                            onClick={() => (point.type === "level" && (isGeneralLevel || isProgrammerLevel)) && onLevelClick(levelName, levelDataForModal)}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center rounded-full shadow-lg p-2 transition-all duration-500 ease-in-out cursor-pointer hover:scale-105"
                            style={{
                                left: point.x,
                                top: point.y,
                                backgroundColor: backgroundColor,
                                width: '100px', // Increased size for better visibility
                                height: '100px',
                                border: `4px solid ${isCompleted ? '#059669' : (isGeneralLevel || isProgrammerLevel && currentLevelProgressCount > 0 ? point.color : (theme === 'dark' ? '#1F2937' : '#D1D5DB'))}`
                            }}
                        >
                            <span className={`text-lg sm:text-xl md:text-2xl font-bold z-10 text-center leading-tight ${stepLabelColor}`}>
                                {/* Display emoji for special points, full level name for others */}
                                {point.type === "special" ? point.emoji : levelName}
                            </span>
                            {/* Removed: currentLevelProgressCount/100 Exercises text */}
                            {/* Removed: Doughnut Chart */}
                        </button>
                    );
                })}
            </div>
            <div className={`mt-12 text-lg ${progressText}`}>
                <p>Keep pushing your limits to unlock new challenges!</p>
                <div className="flex justify-center mt-6">
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 11H13V7H11V11H7V13H11V17H13V13H17V11Z" fill={theme === 'dark' ? '#60A5FA' : '#1D4ED8'}/>
                        <path d="M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4Z" fill={theme === 'dark' ? '#3B82F6' : '#2563EB'}/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

// --- MilestoneModal Component ---
// Progress now expects an array of booleans representing completion status for each exercise
const MilestoneModal = ({ levelName, progress, onClose, theme }) => {
    const totalMilestones = 100;
    const completedCount = progress.filter(Boolean).length;

    const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
    const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
    const completedColor = 'bg-green-500';
    const incompleteColor = theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300';
    const currentTaskColor = 'bg-blue-500'; // For the current task in the modal

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className={`${bgColor} rounded-xl shadow-2xl p-6 relative w-full max-w-4xl max-h-[90vh] overflow-y-auto`}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 text-3xl font-bold"
                >
                    &times;
                </button>
                <h2 className={`text-3xl font-bold mb-4 ${textColor}`}>
                    {levelName} Milestones ({completedCount}/{totalMilestones})
                </h2>
                <p className={`text-lg mb-6 ${textColor}`}>
                    Visualize your progress through all 100 exercises in this level.
                </p>

                <div className="grid grid-cols-10 sm:grid-cols-10 md:grid-cols-10 lg:grid-cols-10 gap-2 p-4 border rounded-lg overflow-y-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}> {/* Adjusted max-height */}
                    {Array.from({ length: totalMilestones }, (_, i) => {
                        const isCompleted = progress[i];
                        // Only mark as 'current' if it's the next uncompleted task
                        const isCurrent = (i === completedCount && !isCompleted);
                        let dotColor = isCompleted ? completedColor : incompleteColor;
                        if (isCurrent) dotColor = currentTaskColor;

                        return (
                            <div
                                key={i}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white transition-colors duration-200 ease-in-out cursor-default
                                    ${dotColor} shadow-md`}
                                title={`Exercise ${i + 1}: ${isCompleted ? 'Completed' : 'Incomplete'}`}
                            >
                                {i + 1}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 text-center">
                    <p className={`${textColor} text-lg`}>
                        Keep practicing to complete all milestones and master this level!
                    </p>
                </div>
            </div>
        </div>
    );
};


export default App;
