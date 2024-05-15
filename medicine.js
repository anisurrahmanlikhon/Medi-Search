
        // Sample medicine data
        const medicines = [
                { name: "💊🍶 Napa", symptoms: ["জ্বর"] },
                { name: "💊 Ace", symptoms: ["জ্বর"] },
                { name: "💊 Paracetamol", symptoms: ["জ্বর"] }, 
                { name: "💊 Alatrol", symptoms: ["সর্দি"] },
                { name: "🍶 Ambrox", symptoms: ["সর্দি"] },
                { name: "💊 Ace", symptoms: ["সর্দি"] },
                { name: "🍶 Rymin", symptoms: ["সর্দি"] },
                { name: "💊 Ace", symptoms: ["মাথা ব্যথা"] },
                { name: "💊 Napa", symptoms: ["মাথা ব্যথা"] },
                { name: "💊 Paracetamol", symptoms: ["মাথা ব্যথা"] },
                { name: "💊 Napa", symptoms: ["পিঠ ব্যথা"] },
                { name: "💊 Ace", symptoms: ["পিঠ ব্যথা"] },
                { name: "💊 Pain Killer Plus", symptoms: ["পিঠ ব্যথা"] },
                { name: "💊 Paracetamol", symptoms: ["পিঠ ব্যথা"] },
                { name: "💊 Phinix", symptoms: ["গ্যাস্টিক"] },
                { name: "💊 Seclo", symptoms: ["গ্যাস্টিক"] },
                { name: "💊 Renitid", symptoms: ["গ্যাস্টিক"] },
                { name: "💊 Maxpro", symptoms: ["গ্যাস্টিক"] },
                { name: "💊 Sergel", symptoms: ["গ্যাস্টিক"] },
                { name: "💊 Losectil", symptoms: ["গ্যাস্টিক"] },
                { name: "💊 Pantonix", symptoms: ["গ্যাস্টিক"] },
                { name: "💊🍶 Antacid", symptoms: ["গ্যাস্টিক"] },
                { name: "🍶 Flacol", symptoms: ["গ্যাস্টিক"] },
                { name: "💊 Omastin", symptoms: ["এলার্জি"] },
                { name: "💊 Rupa", symptoms: ["এলার্জি"] },
                { name: "💊 Altrol", symptoms: ["এলার্জি"] },
                { name: "💊 Rhinil", symptoms: ["এলার্জি"] },
                { name: "💊 Cetirizine", symptoms: ["এলার্জি"] },
                { name: "💊 Imotil", symptoms: ["ডায়রিয়া"] },
                { name: "💊 Lopamid", symptoms: ["ডায়রিয়া"] },
                { name: "💊 Lopera", symptoms: ["ডায়রিয়া"] },
                { name: "💊 Loperin", symptoms: ["ডায়রিয়া"] },
                { name: "💊 Normotil", symptoms: ["ডায়রিয়া"] },
                { name: "💊 Amodis", symptoms: ["আমাশয়"] },
                { name: "💊 Imotil", symptoms: ["আমাশয়"] },
                { name: "💊 Filmat", symptoms: ["আমাশয়"] },
                { name: "💊 Flazil", symptoms: ["আমাশয়"] },
                { name: "💊 Duralax", symptoms: ["কুষ্ঠকাঠিণ্য"] },
                { name: "💊 Duracolax", symptoms: ["কুষ্ঠকাঠিণ্য"] },
                { name: "💊 Bisacodyl", symptoms: ["কুষ্ঠকাঠিণ্য"] },
                { name: "💊 Lubilax", symptoms: ["কুষ্ঠকাঠিণ্য"] },
                { name: "💊 Asmaphen", symptoms: ["নিম্ন রক্তচাপ"] },
                { name: "💊 Brodine 30", symptoms: ["নিম্ন রক্তচাপ"] },
                { name: "🥂 Orsalain N", symptoms: ["নিম্ন রক্তচাপ"] },
                { name: "💊 Bisoprolol", symptoms: ["উচ্চ রক্তচাপ"] },
                { name: "💊 Bistol", symptoms: ["উচ্চ রক্তচাপ"] },
                { name: "💊 Osartil", symptoms: ["উচ্চ রক্তচাপ"] },
                { name: "💊 Angilock", symptoms: ["উচ্চ রক্তচাপ"] },];

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
                let resultHTML = "<h4>যে লক্ষণ সিলেক্ট করেছেন তার মেডিসিন সমূহ</h4><ul>";
                results.forEach(medicine => {
                    resultHTML += `<button type="button" class="btn btn-success mr-2 mb-2 medicine-btn">${medicine.name}</button>`;
                });
                resultHTML += "</ul>";
                medicineResultsElement.innerHTML = resultHTML;
            }
        }
    
