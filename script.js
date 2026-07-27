const imageInput = document.getElementById("imageUpload");
const analyzeBtn = document.getElementById("analyzeBtn");
const imagePreview = document.getElementById("imagePreview");
const resultBox = document.getElementById("result");


// Preview uploaded microscope image

imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    if (file) {

        imagePreview.src = URL.createObjectURL(file);
        imagePreview.style.display = "block";

    }

});



// Analyze button

analyzeBtn.addEventListener("click", async () => {


    const file = imageInput.files[0];


    if (!file) {

        alert("Please upload a microscope image first.");
        return;

    }



    resultBox.innerHTML = `
        <p>🔬 Uploading image...</p>
        <p>AI analysis in progress...</p>
    `;



    try {


        // Create form data

        const formData = new FormData();

        formData.append("image", file);



        // Your n8n webhook URL

        const response = await fetch(
            "https://rimzi.app.n8n.cloud/webhook/microscan-ai",
            {
                method: "POST",
                body: formData
            }
        );



        if (!response.ok) {

            throw new Error(
                "Server error: " + response.status
            );

        }



        // Gemini response is TEXT, not JSON

        const aiResult = await response.text();



        // Display AI report

        resultBox.innerHTML = `

            <h3>🔬 MicroScan AI Report</h3>

            <div class="report">

                ${aiResult.replace(/\n/g, "<br>")}

            </div>

        `;



    } catch (error) {


        console.error(error);


        resultBox.innerHTML = `

            <h3>❌ Error</h3>

            <p>
            Unable to analyze image.
            Please check your connection.
            </p>

            <p>
            ${error.message}
            </p>

        `;


    }


});
