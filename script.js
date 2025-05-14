// document.addEventListener('DOMContentLoaded', () => {
//     const opContainers = document.querySelectorAll('.op-container');
//     const radioButton = document.querySelectorAll('.radio');
//     const subContainers = document.querySelectorAll('.sub-container'); // Select sub-containers
//     const mostPopularRadio = document.getElementById('op2');
//     const mostPopularContainer = mostPopularRadio ? mostPopularRadio.closest('.sub-container') : null;

//     function generateOptions(num) {
//         let optionsHTML = '';
//         for (let i = 1; i <= num; i++) {
//             optionsHTML += `
//                 <div class="variations-row">
//                     <label for="size-${num}-${i}" class="variations-label">Size #${i}</label>
//                     <select id="siz-${num}-${i}">
//                         <option value="S">S</option>
//                         <option value="M">M</option>
//                         <option value="L">L</option>
//                     </select>
//                     <label for="color-${num}-${i}" class="variations-label">Color</label>
//                     <select id="color-${num}-${i}">
//                         <option value="Black">Black</option>
//                         <option value="White">White</option>
//                         <option value="Red">Red</option>
//                         <option value="Blue">Blue</option>
//                         <option value="Green">Green</option>
//                         <option value="Yellow">Yellow</option>
//                     </select>
//                 </div>
//             `;
//         }
//         return optionsHTML;
//     }

//     subContainers.forEach(box => { // Use subContainers here
//         const optionsDiv = box.querySelector('.variations');
//         const unit = parseInt(box.querySelector('.op-container').dataset.unit); // Get unit from op-container
//     });

//     radioButton.forEach(radio => {
//         radio.addEventListener('change', function() {
//             const selectedUnit = parseInt(this.value);
//             subContainers.forEach(box => {
//                 const unit = parseInt(box.querySelector('.op-container').dataset.unit);
//                 const optionsDiv = box.querySelector('.variations');
//                 if (unit === selectedUnit) {
//                     box.classList.add('expanded');
//                     optionsDiv.innerHTML = generateOptions(selectedUnit);
//                     optionsDiv.style.display = 'flex';
//                 } else {
//                     box.classList.remove('expanded');
//                     optionsDiv.innerHTML = '';
//                     optionsDiv.style.display = 'none';
//                 }
//             });
//         });
//     });

//     // Forcefully select and display the "Most Popular" option on load
//     if (mostPopularRadio && mostPopularContainer) {
//         console.log("Most Popular radio button found:", mostPopularRadio);
//         console.log("Most Popular container found:", mostPopularContainer);

//         mostPopularRadio.checked = true;
//         console.log("Most Popular radio button is now checked:", mostPopularRadio.checked);

//         const optionsDiv = mostPopularContainer.querySelector('.variations');
//         const unit = parseInt(mostPopularContainer.querySelector('.op-container').dataset.unit);
//         console.log("Options div for Most Popular:", optionsDiv);
//         console.log("Unit for Most Popular:", unit);

//         if (optionsDiv) {
//             const optionsHTML = generateOptions(unit);
//             optionsDiv.innerHTML = optionsHTML;
//             optionsDiv.style.display = 'flex';
//             console.log("Options div content set and display set to flex.");
//         } else {
//             console.error("Options div not found within Most Popular container.");
//         }

//         mostPopularContainer.classList.add('expanded');
//         console.log("Most Popular container is now expanded:", mostPopularContainer.classList.contains('expanded'));
//     } else {
//         console.error("Could not find Most Popular radio button or container.");
//     }
// });


document.addEventListener('DOMContentLoaded', () => {
    const opContainers = document.querySelectorAll('.op-container');
    const radioButton = document.querySelectorAll('.radio');
    const subContainers = document.querySelectorAll('.sub-container');
    const totalElement = document.querySelector('.total'); // Get the total display element

    function generateOptions(num) {
        let optionsHTML = '';
        for (let i = 1; i <= num; i++) {
            optionsHTML += `
                <div class="variations-row">
                    <label for="size-${num}-${i}" class="variations-label">Size #${i}</label>
                    <select id="siz-${num}-${i}">
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                    </select>
                    <label for="color-${num}-${i}" class="variations-label">Color</label>
                    <select id="color-${num}-${i}">
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="Green">Green</option>
                        <option value="Yellow">Yellow</option>
                    </select>
                </div>
            `;
        }
        return optionsHTML;
    }

    function updateTotal(selectedQuantity) {
        let totalPrice = 0;
        switch (selectedQuantity) {
            case 1:
                totalPrice = 10.00;
                break;
            case 2:
                totalPrice = 18.00;
                break;
            case 3:
                totalPrice = 24.00;
                break;
            default:
                totalPrice = 0.00;
                break;
        }
        totalElement.textContent = `Total : $${totalPrice.toFixed(2)} USD`;
    }

    subContainers.forEach(box => {
        const optionsDiv = box.querySelector('.variations');
        const unit = parseInt(box.querySelector('.op-container').dataset.unit);
    });

    radioButton.forEach(radio => {
        radio.addEventListener('change', function() {
            const selectedUnit = parseInt(this.value);
            subContainers.forEach(box => {
                const unit = parseInt(box.querySelector('.op-container').dataset.unit);
                const optionsDiv = box.querySelector('.variations');
                if (unit === selectedUnit) {
                    box.classList.add('expanded');
                    optionsDiv.innerHTML = generateOptions(selectedUnit);
                    optionsDiv.style.display = 'flex';
                    updateTotal(selectedUnit); // Update total when a radio button is selected
                } else {
                    box.classList.remove('expanded');
                    optionsDiv.innerHTML = '';
                    optionsDiv.style.display = 'none';
                }
            });
        });
    });

    // Initially set the total based on the pre-checked radio button
    const initialCheckedRadio = document.querySelector('.radio:checked');
    if (initialCheckedRadio) {
        const initialQuantity = parseInt(initialCheckedRadio.value);
        updateTotal(initialQuantity);
        const initiallyExpandedContainer = initialCheckedRadio.closest('.sub-container');
        if (initiallyExpandedContainer) {
            const optionsDiv = initiallyExpandedContainer.querySelector('.variations');
            const unit = parseInt(initiallyExpandedContainer.querySelector('.op-container').dataset.unit);
            if (optionsDiv) {
                optionsDiv.innerHTML = generateOptions(unit);
                optionsDiv.style.display = 'flex';
                initiallyExpandedContainer.classList.add('expanded');
            }
        }
    }
});