class InteractiveEyeCard {
  constructor(rightEyeId, leftEyeId, rightPupilId, leftPupilId) {
    this.rightEye = document.getElementById(rightEyeId);
    this.leftEye = document.getElementById(leftEyeId);
    this.rightPupil = document.getElementById(rightPupilId);
    this.leftPupil = document.getElementById(leftPupilId);

    this.init();
  }

  init() {
    this.rightPupil.style.transform = "translate(-50%, -50%)";
    this.leftPupil.style.transform = "translate(-50%, -50%)";
  }

  trackEyes(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const rightEyeRect = this.rightEye.getBoundingClientRect();
    const leftEyeRect = this.leftEye.getBoundingClientRect();

    const rightEyeCenterX = rightEyeRect.left + rightEyeRect.width / 2;
    const rightEyeCenterY = rightEyeRect.top + rightEyeRect.height / 2;
    const leftEyeCenterX = leftEyeRect.left + leftEyeRect.width / 2;
    const leftEyeCenterY = leftEyeRect.top + leftEyeRect.height / 2;

    // Calculate distance from mouse to each eye center
    const distanceRight = Math.sqrt(
      (mouseX - rightEyeCenterX) ** 2 + (mouseY - rightEyeCenterY) ** 2
    );
    const distanceLeft = Math.sqrt(
      (mouseX - leftEyeCenterX) ** 2 + (mouseY - leftEyeCenterY) ** 2
    );

    // Maximum movement radius for each pupil (40px)
    const maxRadius = 40;

    // Calculate movement for right pupil
    let moveRightX =
      (mouseX - rightEyeCenterX) * (maxRadius / Math.max(distanceRight, 1));
    let moveRightY =
      (mouseY - rightEyeCenterY) * (maxRadius / Math.max(distanceRight, 1));

    // Calculate movement for left pupil
    let moveLeftX =
      (mouseX - leftEyeCenterX) * (maxRadius / Math.max(distanceLeft, 1));
    let moveLeftY =
      (mouseY - leftEyeCenterY) * (maxRadius / Math.max(distanceLeft, 1));

    // Apply movement to pupils
    this.rightPupil.style.transform = `translate(calc(-50% + ${moveRightX}px), calc(-50% + ${moveRightY}px))`;
    this.leftPupil.style.transform = `translate(calc(-50% + ${moveLeftX}px), calc(-50% + ${moveLeftY}px))`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const eyeCard = new InteractiveEyeCard(
    "eye1",
    "eye2",
    "eyeBall1",
    "eyeBall2"
  );

  document.addEventListener("mousemove", eyeCard.trackEyes.bind(eyeCard));
  document.addEventListener("mouseleave", eyeCard.init.bind(eyeCard));
});
