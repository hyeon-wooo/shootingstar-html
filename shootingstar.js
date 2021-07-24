const __ss_getRandomVertex = (maxX, maxY, distanceWidth) => [
  Math.floor((Math.random() * maxX) / 2),
  Math.floor((Math.random() * maxY) / 2),
];

const __defaultShootingStarOptions = {
  starLength: 80,
  starColor: "#ccccff",
  distance: 120,
  shootingDuration: 600,
  frequency: 1500,
  minFrequency: 500,
  stoped: false,
  playWhenCreated: true,
  showBackgroundStars: true,
  numberOfBackgroundStars: 20,
};

function ShootingStar(target, options = __defaultShootingStarOptions) {
  this.option = { ...__defaultShootingStarOptions, ...options };
  this.timer = null;

  // Define Container
  const container = document.createElement("div");
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.position = "absolute";

  // Define methods
  this.getCurrentOption = (param) => {
    // Return whole of current option when param isn't exist.
    if (!param) return this.option;

    // Return null when param is neither array nor string (= Invalid parameter).
    const paramType = param.__proto__.constructor.name;
    if (!["Array", "String"].includes(paramType)) return null;

    // Return a single option.
    if (paramType === "String") return this.option[param];
    // Return some options matched to each item of list
    return param.map((a) => this.option[a]);
  };
  this.setStarLength = (l) => {
    if (typeof l !== "number" || isNaN(l)) {
      console.warn(
        "StarLength must be a number, not NaN. Check the parameter of setStarLength()"
      );
      return;
    }
    this.option.distance = l;
  };
  this.setDistance = (d) => {
    if (typeof d !== "number" || isNaN(d)) {
      console.warn(
        "Distance must be a number, not NaN. Check the parameter of setDistance()"
      );
      return;
    }
    this.option.distance = d;
  };
  this.setStarColor = (c) => {
    if (typeof c !== "string") {
      console.warn(
        "The color of star must be a string. Check the parameter of setStarColor()"
      );
      return;
    }
    this.option.starColor = c;
  };
  this.setFrequency = (f) => {
    if (typeof f !== "number" || isNaN(f)) {
      console.warn(
        "Frequency must be a number, not NaN. Check the parameter of setFrequency()"
      );
      return;
    }
    if (f < 0) {
      console.warn(`Frequency can not be a negative number.`);
      return;
    }
    this.option.frequency = f;
  };
  this.setMinFrequency = (f) => {
    if (typeof f !== "number" || isNaN(f)) {
      console.warn(
        "Frequency must be a number, not NaN. Check the parameter of setFrequency()"
      );
      return;
    }
    if (f > this.option.frequency) {
      console.warn(
        `The minimum frequency can not be higher than frequency. Current frequency is ${this.option.frequency}ms.`
      );
      return;
    }
    if (f < 0) {
      console.warn(`The minimum frequency can not be a negative number.`);
      return;
    }
    this.option.minFrequency = f;
  };
  this.setShootingDuration = (d) => {
    if (typeof d !== "number" || isNaN(d)) {
      console.warn(
        "The shooting duration must be a number, not NaN. Check the parameter of setShootingDuration()"
      );
      return;
    }
    this.option.shootingDuration = d;
  };
  this.stop = () => {
    this.option.stoped = true;
    clearTimeout(this.timer);
    this.timer = null;
  };
  this.play = () => {
    if (this.timer) {
      console.warn("Shooting Star is already playing.");
      return;
    }
    this.option.stoped = false;
    shoot();
  };
  this.hideBackgroundStars = () => {
    const stars = document.querySelectorAll(".backgroundStar");
    for (const s of stars) container.removeChild(s);
  };
  this.showBackgroundStars = () => {
    showBack();
  };
  this.setNumberOfBackgroundStars = (newNumber) => {
    if (typeof newNumber !== number || isNaN(newNumber)) {
      console.warn(
        "The number of backgroundStars must be a number, not NaN. Check the parameter of setNumberOfBackgroundStars()"
      );
      return;
    }
    this.option.numberOfBackgroundStars = newNumber;
    this.hideBackgroundStars();
    this.showBackgroundStars();
  };

  // Shooting
  const shoot = () => {
    const { starLength, shootingDuration, frequency, starColor, stoped } =
      this.option;
    let { distance } = this.option;
    const starHalfHeight = starLength / Math.sqrt(2) / 2;
    let distanceWidth = distance / Math.sqrt(2);

    const maxInitialRight = target.clientWidth - distanceWidth;
    const maxInitialTop = target.clientHeight - distanceWidth;
    const [initialRight, initialTop] = __ss_getRandomVertex(
      maxInitialRight >= 0 ? maxInitialRight : 0,
      maxInitialTop >= 0 ? maxInitialTop : 0
    );

    const star = document.createElement("div");
    star.style.width = `${starLength}px`;
    star.style.height = 0;
    star.style.borderTop = `1px solid ${starColor}`;
    star.style.opacity = 0.5;
    star.style.backgroundColor = starColor;
    star.style.borderRadius = "100px";
    star.style.position = "absolute";
    star.style.boxShadow = "0px 0px 6px 2px #ffffff44";
    star.style.transform = "rotateZ(-45deg)";

    container.appendChild(star);

    const animSequence = [
      // Positioning
      {
        width: "0px",
        right: `${initialRight}px`,
        top: `${initialTop}px`,
      },
      // Scaling
      {
        width: `${starLength}px`,
        opacity: 0.8,
        right: `${initialRight}px`,
        top: `${starHalfHeight + initialTop}px`,
        offset: 0.35,
      },
      // Moving
      {
        width: `${starLength}px`,
        height: "2px",
        opacity: 1,
        right: `${distance + initialRight}px`,
        top: `${distance + initialTop + starHalfHeight}px`,
        offset: 0.65,
      },
      // Scaling
      {
        width: 0,
        height: "0.5px",
        opacity: 1,
        right: `${initialRight + distance + starLength}px`,
        top: `${starHalfHeight * 2 + initialTop + distance}px`,
        offset: 1,
      },
    ];

    const anim = star.animate(animSequence, {
      duration: shootingDuration,
    });
    anim.addEventListener("finish", () => {
      container.removeChild(star);
    });

    if (!stoped) {
      const { minFrequency } = this.option;
      const nextTiming =
        Math.random() * (frequency - minFrequency || 1) + minFrequency;
      this.timer = setTimeout(shoot, Math.floor(nextTiming));
    }
  };

  this.option.playWhenCreated && shoot();

  const showBack = () => {
    for (const i in Array.from(
      { length: this.option.numberOfBackgroundStars },
      (x, i) => i
    )) {
      const backStar = document.createElement("div");
      backStar.className = "backgroundStar";
      backStar.style.position = "absolute";
      backStar.style.left = `${Math.floor(
        Math.random() * target.clientWidth
      )}px`;
      backStar.style.top = `${Math.floor(
        Math.random() * target.clientHeight
      )}px`;

      backStar.style.border = "1px solid " + this.option.starColor;
      backStar.style.width = "0px";
      backStar.style.height = "0px";

      const opacity = Math.floor(Math.random() * 100 + 30) / 100;
      const blur = Math.floor(opacity * 10);
      backStar.style.boxShadow = `0px 0px ${blur}px ${blur / 5}px #f3f3f3`;
      backStar.style.opacity = opacity;

      container.appendChild(backStar);
    }
  };

  this.option.showBackgroundStars && showBack();

  target.appendChild(container);
}
