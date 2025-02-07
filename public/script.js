window.onload = () => {
    setTimeout(() => {
        document.querySelector("#spinner").style.display = "none";
        document.querySelector("#content").style.display = "block";
    }, 1000) //3 sec normal decrrease for developmenr
}
async function askGemini() {
    const userQuery = document.getElementById("userQuery").value;
    const responseDiv = document.getElementById("response");
    const loadingDiv = document.getElementById("loading");

    if (!userQuery) {
        alert("Please enter a question!");
        return;
    }

    responseDiv.innerText = "";
    loadingDiv.style.display = "block";

    try {
        const res = await fetch("/ask-gemini", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userPrompt: userQuery })
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.text();
        responseDiv.innerText = data;
    } catch (error) {
        console.error("Error fetching data:", error);
        responseDiv.innerText = "Error getting response!";
    } finally {
        loadingDiv.style.display = "none";
    }
}

document.getElementById("toggle-theme").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
    document.getElementById("toggle-theme").classList.toggle("bi-moon-fill");
    document.getElementById("toggle-theme").classList.toggle("bi-sun-fill");
});


