<template>
  <div class="home-container">
    <div class="portfolio-card">
      <div class="profile-container">
        <img
          src="../assets/images/photo_2025-01-14_15-35-04.jpg"
          alt="Your Picture"
          class="profile-image"
        />
      </div>
      <h2 class="name">Heng Hoursan</h2>
      <p class="job-title">Web Developer</p>
      <p class="description">
        A passionate web developer with experience in front-end and back-end
        technologies.
      </p>

      <div class="technologies">
        <h3>Technologies I Have Learned:</h3>
        <ul>
          <li><i class="fab fa-html5 tech-icon html-icon"></i> HTML</li>
          <li><i class="fab fa-css3-alt tech-icon css-icon"></i> CSS</li>
          <li><i class="fab fa-js-square tech-icon js-icon"></i> JavaScript</li>
          <li><i class="fab fa-react tech-icon react-icon"></i> ReactJS</li>
          <li><i class="fab fa-php tech-icon php-icon"></i> PHP</li>
          <li><i class="fab fa-laravel tech-icon laravel-icon"></i> Laravel</li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div class="contact-info">
        <p>Email: henghoursan030604@gmail.com</p>
        <p>Phone: +885 773 123</p>
        <p>Location: Battambang, Cambodia</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
/* Main container for the page */
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  height: 100%; /* Black to transparent gradient */
}

.portfolio-card {
  background-color: black; /* Dark background */
  border-radius: 20px;
  width: 550px;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeIn 1s ease-out;
}

.portfolio-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Profile Image */
.profile-container {
  position: relative;
  margin-bottom: 20px;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: slideIn 1s ease-out;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Name Styling */
.name {
  margin: 15px 0;
  font-size: 32px; /* Increased font size */
  font-weight: bold;
  color: #333;
  transition: color 0.3s ease;
}

.name:hover {
  color: dodgerblue;
}

/* Job Title */
.job-title {
  font-size: 22px; /* Increased font size */
  color: #888;
  margin-bottom: 20px;
}

/* Description */
.description {
  font-size: 19px; /* Increased font size */
  color: #555;
  margin-bottom: 25px;
}

/* Technologies List */
.technologies {
  cursor: pointer;
  text-align: left;
  margin-bottom: 25px;
}

.technologies h3 {
  font-size: 24px; /* Increased font size */
  font-weight: bold;
  color: #ddd; /* Changed color for dark mode */
  margin-bottom: 10px;
}

.technologies ul {
  list-style-type: none;
  padding: 0;
}

.technologies li {
  font-size: 18px; /* Increased font size */
  color: #ddd; /* Changed color for dark mode */
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  transition: transform 0.3s ease;
}

.technologies li:hover {
  transform: scale(1.05);
  color: dodgerblue; /* Changed hover color for dark mode */
}

.tech-icon {
  margin-right: 10px;
  font-size: 22px; /* Increased icon size */
  transition: color 0.3s ease;
}

.html-icon {
  color: #e34c26;
}

.css-icon {
  color: #2965f1;
}

.js-icon {
  color: #f7df1e;
}

.react-icon {
  color: #61dafb;
}

.php-icon {
  color: #777bb3;
}

.laravel-icon {
  color: #ff2d20;
}

/* Contact Info */
.contact-info p {
  font-size: 16px; /* Increased font size */
  color: #555;
  margin: 5px 0;
  transition: color 0.3s ease;
}

.contact-info p:hover {
  color: dodgerblue;
}
</style>
