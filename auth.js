import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBgOgOrtS6P-oJj39UxOP5QjolPqc0cMJk",
    authDomain: "myka-tech.firebaseapp.com",
    projectId: "myka-tech",
    storageBucket: "myka-tech.firebasestorage.app",
    messagingSenderId: "922086084506",
    appId: "1:922086084506:web:349fd90c68096ed7397423"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('authForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim().toLowerCase();
    const role = document.getElementById('userRole').value;

    if (isSignUpMode) {
        // Shared Data
        const userData = {
            email: email,
            userRole: role,
            name: document.getElementById('fullname').value || "User",
            futureInterest: document.getElementById('reg-interest').value,
            mentorRecommendation: "", // Initialized empty for later pivot
            createdAt: new Date().toISOString()
        };

        // Conditional Data Logic based on Role 
        if (role === 'mother') {
            userData.prevField = document.getElementById('prev_field').value || "N/A";
            userData.breakYears = document.getElementById('break_years').value || 0;
            userData.skills = document.getElementById('home_skills').value || "General Management";
        } else {
            userData.education = document.getElementById('education').value || "N/A";
            userData.passYear = document.getElementById('passout').value || "N/A";
            userData.marks = document.getElementById('marks').value || "N/A";
        }

        try {
            await setDoc(doc(db, "users", email), userData);
            handleLoginSuccess(email);
        } catch (error) {
            alert("Registration failed: " + error.message);
        }

    } else {
        // Sign In Logic
        try {
            const docSnap = await getDoc(doc(db, "users", email));
            if (docSnap.exists()) {
                handleLoginSuccess(email);
            } else {
                alert("Account not found. Please Sign Up.");
            }
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    }
});

function handleLoginSuccess(email) {
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'dashboard.html';
}