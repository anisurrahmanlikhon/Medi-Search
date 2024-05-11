
        // Sample medicine data
        const medicines = [
            { name: "💊🍶 Napa", symptoms: ["Fever"] },
            { name: "💊 Ace", symptoms: ["Fever"] },
            { name: "💊 Paracetamol", symptoms: ["Fever"] }, 
            
            
            { name: "💊 Alatrol", symptoms: ["Cough"] },
            { name: "🍶 Ambrox", symptoms: ["Cough"] },
            { name: "💊 Ace", symptoms: ["Cough"] },
            { name: "🍶 Rymin", symptoms: ["Cough"] },
                
    
            { name: "💊 Ace", symptoms: ["Headache"] },
            { name: "💊 Napa", symptoms: ["Headache"] },
            { name: "💊 Paracetamol", symptoms: ["Headache"] },
                
                
            { name: "💊 Napa", symptoms: ["Back Pain"] },
            { name: "💊 Ace", symptoms: ["Back Pain"] },
            { name: "💊 Pain Killer Plus", symptoms: ["Back Pain"] },
            { name: "💊 Paracetamol", symptoms: ["Back Pain"] },
            


            { name: "💊 Phinix", symptoms: ["Gastics"] },
            { name: "💊 Seclo", symptoms: ["Gastics"] },
            { name: "💊 Renitid", symptoms: ["Gastics"] },
            { name: "💊 Maxpro", symptoms: ["Gastics"] },
            { name: "💊 Sergel", symptoms: ["Gastics"] },
            { name: "💊 Losectil", symptoms: ["Gastics"] },
            { name: "💊 Pantonix", symptoms: ["Gastics"] },
            { name: "💊🍶 Antacid", symptoms: ["Gastics"] },
            { name: "🍶 Flacol", symptoms: ["Gastics"] },

            
            { name: "💊 Omastin", symptoms: ["Allergic"] },
            { name: "💊 Rupa", symptoms: ["Allergic"] },
            { name: "💊 Altrol", symptoms: ["Allergic"] },
            { name: "💊 Rhinil", symptoms: ["Allergic"] },
            { name: "💊 Cetirizine", symptoms: ["Allergic"] },

                
            { name: "💊 Imotil", symptoms: ["Diarrhea"] },
            { name: "💊 Lopamid", symptoms: ["Diarrhea"] },
            { name: "💊 Lopera", symptoms: ["Diarrhea"] },
            { name: "💊 Loperin", symptoms: ["Diarrhea"] },
            { name: "💊 Normotil", symptoms: ["Diarrhea"] },
                
            
            { name: "💊 Amodis", symptoms: ["Dysentery"] },
            { name: "💊 Imotil", symptoms: ["Dysentery"] },
            { name: "💊 Filmat", symptoms: ["Dysentery"] },
            { name: "💊 Flazil", symptoms: ["Dysentery"] },
                
                
            { name: "💊 Duralax", symptoms: ["Constipation"] },
            { name: "💊 Duracolax", symptoms: ["Constipation"] },
            { name: "💊 Bisacodyl", symptoms: ["Constipation"] },
            { name: "💊 Lubilax", symptoms: ["Constipation"] },


            { name: "💊 Asmaphen", symptoms: ["Low Pressure"] },
            { name: "💊 Brodine 30", symptoms: ["Low Pressure"] },
            { name: "🥂 Orsalain N", symptoms: ["Low Pressure"] },
                
    
            { name: "💊 Bisoprolol", symptoms: ["High Pressure"] },
            { name: "💊 Bistol", symptoms: ["High Pressure"] },
            { name: "💊 Osartil", symptoms: ["High Pressure"] },
            { name: "💊 Angilock", symptoms: ["High Pressure"] },
            
           
                
            
                
           
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
                medicineResultsElement.innerHTML = "<p>No medicines found. Select/Enter only one symptom.</p>";
            } else {
                let resultHTML = "<h3>Medicines for Selected Symptom</h3><ul>";
                results.forEach(medicine => {
                    resultHTML += `<button type="button" class="btn btn-success mr-2 mb-2 medicine-btn">${medicine.name}</button>`;
                });
                resultHTML += "</ul>";
                medicineResultsElement.innerHTML = resultHTML;
            }
        }
    
