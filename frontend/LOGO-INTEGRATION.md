# AUTONOVA Logo Integration Instructions

## How to Add Your Official Logo

1. **Save your logo file** to `/app/frontend/public/images/autonova-logo.png`
   (You can use any format: .png, .svg, .jpg)

2. **Replace the placeholder logo** in the code:

### In Header (Line ~117 in App.js):
Replace this:
```jsx
<div className="text-white font-orbitron text-2xl font-black tracking-wider transform skew-x-12">
  A
</div>
```

With this:
```jsx
<img 
  src="/images/autonova-logo.png" 
  alt="AUTONOVA Logo"
  className="h-8 w-auto"
  style={{
    filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.6))'
  }}
/>
```

### In Footer (Line ~1465 in App.js):
Replace this:
```jsx
<div className="text-white font-orbitron text-xl font-black tracking-wider transform skew-x-12">
  A
</div>
```

With this:
```jsx
<img 
  src="/images/autonova-logo.png" 
  alt="AUTONOVA Logo"
  className="h-6 w-auto"
  style={{
    filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))'
  }}
/>
```

## Logo Requirements
- **Recommended size**: 200x100px (2:1 aspect ratio)
- **Format**: PNG with transparent background preferred
- **Color**: White or light colored logo works best with the dark theme
- **File size**: Keep under 50KB for optimal loading

## Current Placeholder
The current "A" letter placeholder maintains the futuristic styling and will be automatically replaced when you add your logo file.