// Öğrenci ve okul verileri, localStorage üzerinde tutulacak.
const okulKayitForm = document.getElementById('okulKayitForm');
const ogrenciKayitForm = document.getElementById('ogrenciKayitForm');
const dataEntryForm = document.getElementById('dataEntryForm');
const viewDataForm = document.getElementById('viewDataForm');
const viewResult = document.getElementById('viewResult');

// Okul Kayıt
okulKayitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const schoolProvince = document.getElementById('schoolProvince').value;
    const schoolDistrict = document.getElementById('schoolDistrict').value;
    const schoolName = document.getElementById('schoolName').value;
    const schoolPassword = document.getElementById('schoolPassword').value;

    // Okul verilerini localStorage'a kaydediyoruz
    localStorage.setItem('school', JSON.stringify({
        schoolProvince, schoolDistrict, schoolName, schoolPassword
    }));

    alert('Okul Kaydı Yapıldı');
});

// Öğrenci Kayıt
ogrenciKayitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const studentName = document.getElementById('studentName').value;
    const studentSurname = document.getElementById('studentSurname').value;
    const studentEmail = document.getElementById('studentEmail').value;
    const studentNumber = document.getElementById('studentNumber').value;
    const studentPhone = document.getElementById('studentPhone').value;
    const studentClass = document.getElementById('studentClass').value;

    // Öğrenci verilerini localStorage'a kaydediyoruz
    localStorage.setItem(studentEmail, JSON.stringify({
        studentName, studentSurname, studentEmail, studentNumber, studentPhone, studentClass, points: 0
    }));

    alert('Öğrenci Kaydı Yapıldı');
});

// Veri Girişi
dataEntryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const wasteWeight = parseFloat(document.getElementById('wasteWeight').value);
    const wasteType = document.getElementById('wasteType').value;
    const studentEmail = prompt("Öğrencinin E-postasını Girin");

    if (!studentEmail) {
        alert("E-posta gerekli.");
        return;
    }

    const studentData = JSON.parse(localStorage.getItem(studentEmail));
    if (!studentData) {
        alert("Öğrenci bulunamadı.");
        return;
    }

    const credit = calculateCredit(wasteWeight, wasteType);
    studentData.points += credit;

    // Güncellenmiş veriyi tekrar localStorage'a kaydediyoruz
    localStorage.setItem(studentEmail, JSON.stringify(studentData));

    alert(`${wasteType} için ${credit} kredi eklendi.`);
});

// Kredi Hesaplama Fonksiyonu
function calculateCredit(weight, type) {
    let creditPerKg;

    switch(type) {
        case "Yağ":
            creditPerKg = 5; // Yağ için her kg 5 kredi
            break;
        case "Tekstil":
            creditPerKg = 3; // Tekstil için her kg 3 kredi
            break;
        case "Pil":
            creditPerKg = 10; // Pil için her kg 10 kredi
            break;
        case "Elektronik":
            creditPerKg = 20; // Elektronik için her kg 20 kredi
            break;
        case "Kağıt":
            creditPerKg = 2; // Kağıt için her kg 2 kredi
            break;
        case "Cam":
            creditPerKg = 4; // Cam için her kg 4 kredi
            break;
        case "Metal":
            creditPerKg = 6; // Metal için her kg 6 kredi
            break;
        case "Plastik":
            creditPerKg = 3; // Plastik için her kg 3 kredi
            break;
        default:
            creditPerKg = 0;
    }

    return creditPerKg * weight; // Kredi, ağırlıkla çarpılır
}

// Veri Görüntüleme
viewDataForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const viewEmail = document.getElementById('viewStudentEmail').value;
    const viewNumber = document.getElementById('viewStudentNumber').value;

    const studentData = JSON.parse(localStorage.getItem(viewEmail));

    // Öğrenci verisi kontrolü
    if (!studentData || studentData.studentNumber !== viewNumber) {
        alert("Geçersiz e-posta veya öğrenci numarası.");
        return;
    }

    const resultHTML = `
        <p><strong>Adı:</strong> ${studentData.studentName} ${studentData.studentSurname}</p>
        <p><strong>Öğrenci Numarası:</strong> ${studentData.studentNumber}</p>
        <p><strong>Sınıf:</strong> ${studentData.studentClass}</p>
        <p><strong>Toplam Kredi:</strong> ${studentData.points}</p>
    `;

    viewResult.innerHTML = resultHTML;
});
