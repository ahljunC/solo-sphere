import React from 'react'

interface LoginBackgroundProps {
  className?: string;
}

export function LoginBackground({ className = '' }: LoginBackgroundProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-700">
        {/* Professional workspace elements using SVG */}
        <svg
          className="absolute inset-0 w-full h-full text-white/10"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <defs>
            <pattern
              id="desk-pattern"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(1) rotate(0)"
            >
              {/* Laptop/computer representation */}
              <rect x="50" y="70" width="100" height="60" rx="2" fill="currentColor" opacity="0.3" />
              <rect x="60" y="80" width="80" height="40" rx="1" fill="currentColor" opacity="0.4" />
              
              {/* Coffee cup */}
              <circle cx="170" cy="80" r="10" fill="currentColor" opacity="0.3" />
              <rect x="165" y="90" width="10" height="15" rx="2" fill="currentColor" opacity="0.3" />
              
              {/* Papers/documents */}
              <rect x="20" y="75" width="20" height="30" rx="1" transform="rotate(-10 20 75)" fill="currentColor" opacity="0.2" />
              <rect x="15" y="85" width="25" height="30" rx="1" transform="rotate(-5 15 85)" fill="currentColor" opacity="0.3" />
              
              {/* Chart/graph elements */}
              <rect x="100" y="20" width="60" height="40" rx="1" fill="currentColor" opacity="0.2" />
              <path d="M110 50 L120 35 L130 45 L140 30 L150 40 L160 25"
                stroke="currentColor" strokeWidth="1.5" opacity="0.4" fill="none" />
              
              {/* Desk plant */}
              <rect x="30" y="30" width="10" height="15" rx="1" fill="currentColor" opacity="0.3" />
              <path d="M35 30 C30 25 25 28 25 20 C25 15 30 15 35 20 C40 15 45 15 45 20 C45 28 40 25 35 30"
                fill="currentColor" opacity="0.25" />
              
              {/* Calendar/planner */}
              <rect x="170" y="130" width="25" height="30" rx="1" fill="currentColor" opacity="0.25" />
              <line x1="170" y1="140" x2="195" y2="140" stroke="currentColor" opacity="0.4" />
              <line x1="170" y1="150" x2="195" y2="150" stroke="currentColor" opacity="0.4" />
              <line x1="180" y1="130" x2="180" y2="160" stroke="currentColor" opacity="0.4" />
              
              {/* Tablet/device */}
              <rect x="40" y="140" width="40" height="30" rx="2" fill="currentColor" opacity="0.3" />
              
              {/* Global business elements */}
              <circle cx="120" cy="140" r="20" fill="currentColor" opacity="0.15" />
              <path d="M120 120 L120 160 M100 140 L140 140" stroke="currentColor" opacity="0.3" />
              <path d="M100 130 C110 120 130 120 140 130 C150 140 150 150 140 155 C130 160 110 160 100 155 C90 150 90 140 100 130"
                stroke="currentColor" opacity="0.2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#desk-pattern)" />
        </svg>
        
        {/* Connection patterns - representing business networks */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <defs>
            <pattern
              id="connection-pattern"
              width="300"
              height="300"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(1.2) rotate(5)"
            >
              <path
                d="M20 100 Q150 50 280 150 M50 200 Q150 250 250 180 M150 20 Q100 150 150 280"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                fill="none"
              />
              <circle cx="20" cy="100" r="3" fill="rgba(255,255,255,0.2)" />
              <circle cx="280" cy="150" r="3" fill="rgba(255,255,255,0.2)" />
              <circle cx="50" cy="200" r="3" fill="rgba(255,255,255,0.2)" />
              <circle cx="250" cy="180" r="3" fill="rgba(255,255,255,0.2)" />
              <circle cx="150" cy="20" r="3" fill="rgba(255,255,255,0.2)" />
              <circle cx="150" cy="280" r="3" fill="rgba(255,255,255,0.2)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#connection-pattern)" />
        </svg>
      </div>
      
      {/* Overlay gradient for text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80" />
    </div>
  )
}