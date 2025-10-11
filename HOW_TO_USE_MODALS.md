# איך להשתמש בקבצי המודלים המרכזיים

במקום לשכפל את הקוד בכל קובץ HTML, השתמש בקבצים הבאים:

## קבצים שנוצרו:

### 1. מודל "אודותינו"
- `about-modal.css` - עיצוב המודל
- `about-modal.js` - פונקציות פתיחה/סגירה
- `about-modal.html` - תוכן ה-HTML של המודל

### 2. מודל "צור קשר / יעוץ אישי"
- `consultation-form.css` - עיצוב הטופס
- `consultation-form.js` - פונקציות הטופס
- `consultation-form.html` - תוכן ה-HTML של הטופס

---

## איך להשתמש?

### בכל קובץ HTML, הוסף בתוך ה-`<head>`:

```html
<!-- About Modal CSS -->
<link rel="stylesheet" href="about-modal.css">

<!-- Consultation Form CSS -->
<link rel="stylesheet" href="consultation-form.css">
```

### לפני סגירת תג ה-`</body>`:

```html
<!-- About Modal HTML -->
<script src="about-modal.js"></script>

<!-- Consultation Form JS -->
<script src="consultation-form.js"></script>

</body>
```

### וכאן תייבא את ה-HTML עצמו (לפני `</body>`):

אתה יכול להשתמש ב-JavaScript כדי לטעון את הקבצים:

```html
<div id="about-modal-container"></div>
<div id="consultation-form-container"></div>

<script>
// טעינת המודל "אודותינו"
fetch('about-modal.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('about-modal-container').innerHTML = html;
    });

// טעינת הטופס "צור קשר"
fetch('consultation-form.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('consultation-form-container').innerHTML = html;
    });
</script>
```

### או השתמש ב-PHP Include (אם השרת שלך תומך):

```html
<?php include 'about-modal.html'; ?>
<?php include 'consultation-form.html'; ?>
```

---

## יתרונות השיטה הזו:

✅ **קוד מרכזי** - שינוי במקום אחד משפיע על כל הדפים  
✅ **קל לתחזוקה** - עדכון הטקסט נעשה רק פעם אחת  
✅ **נקי יותר** - כל קובץ HTML קטן יותר וקריא יותר  
✅ **ביצועים** - הדפדפן יכול לשמור בזיכרון המטמון (cache)  

---

## דוגמה מלאה לקובץ HTML:

```html
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <title>הדף שלי</title>
    
    <!-- CSS Files -->
    <link rel="stylesheet" href="about-modal.css">
    <link rel="stylesheet" href="consultation-form.css">
</head>
<body>

    <!-- תפריט הניווט -->
    <nav>
        <a href="#" onclick="openAboutModal(); return false;">אודות</a>
        <a href="#" onclick="openConsultationForm(); return false;">צור קשר</a>
    </nav>

    <!-- תוכן הדף שלך כאן... -->

    <!-- Containers for modals -->
    <div id="about-modal-container"></div>
    <div id="consultation-form-container"></div>

    <!-- JavaScript Files -->
    <script src="about-modal.js"></script>
    <script src="consultation-form.js"></script>
    
    <!-- Load HTML content -->
    <script>
        fetch('about-modal.html')
            .then(response => response.text())
            .then(html => document.getElementById('about-modal-container').innerHTML = html);
        
        fetch('consultation-form.html')
            .then(response => response.text())
            .then(html => document.getElementById('consultation-form-container').innerHTML = html);
    </script>

</body>
</html>
```

---

**הערה חשובה:** הטעינה באמצעות `fetch()` דורשת שהדף ירוץ דרך שרת (לא ישירות מהתיקייה). אם אתה עובד מקומית, השתמש ב-Live Server או XAMPP.

