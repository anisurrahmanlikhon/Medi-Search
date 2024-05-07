<script>
        // Sample medicine data
        const medicines = [
            { name: "💊 Napa", symptoms: ["Fever", "Headache", "Back Pain"] },
            { name: "💊 Ambrox", symptoms: ["Cough", "Headache", "Back Pain", "Fever"] },
            { name: "💊 Bisoprolol", symptoms: ["High Pressure"] }
            // Add more medicine objects with their respective symptoms
        ];

        let selectedSymptoms = [];

        function toggleSymptom(symptom) {
            const index = selectedSymptoms.indexOf(symptom);
            if (index === -1) {
                selectedSymptoms.push(symptom);
            } else {
                selectedSymptoms.splice(index, 1);
            }
            renderSelectedSymptoms();
            updateSearchBar();
        }

        function renderSelectedSymptoms() {
            const selectedSymptomsElement = document.getElementById("selectedSymptoms");
            selectedSymptomsElement.innerHTML = selectedSymptoms.map(symptom => {
                return `<button type="button" class="btn btn-secondary selected-symptom" onclick="removeSelectedSymptom('${symptom}')">${symptom} <span aria-hidden="true">&times;</span></button>`;
            }).join("");
        }

        function removeSelectedSymptom(symptom) {
            const index = selectedSymptoms.indexOf(symptom);
            if (index !== -1) {
                selectedSymptoms.splice(index, 1);
                renderSelectedSymptoms();
                updateSearchBar();
            }
        }

        function updateSearchBar() {
            const searchBar = document.getElementById("symptom");
            searchBar.value = selectedSymptoms.join(", ");
        }

        function updateSelectedSymptoms() {
            const searchBar = document.getElementById("symptom");
            const symptoms = searchBar.value.split(",").map(symptom => symptom.trim());
            selectedSymptoms = symptoms.filter(symptom => symptom !== "");
            renderSelectedSymptoms();
        }

        function searchMedicine() {
            const medicineResultsElement = document.getElementById("medicineResults");
            medicineResultsElement.innerHTML = ""; // Clear previous results

            const results = medicines.filter(medicine => {
                return selectedSymptoms.every(symptom => medicine.symptoms.includes(symptom));
            });

            if (results.length === 0) {
                medicineResultsElement.innerHTML = "<p>No medicine found for selected symptoms.</p>";
            } else {
                let resultHTML = "<h3>Medicines for Selected Symptoms</h3><ul>";
                results.forEach(medicine => {
                    resultHTML += `<button type="button" class="btn btn-success mr-2 mb-2 medicine-btn">${medicine.name}</button>`;
                });
                resultHTML += "</ul>";
                medicineResultsElement.innerHTML = resultHTML;
            }
        }
    </script>