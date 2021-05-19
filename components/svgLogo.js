import React from 'react'
import Link from 'next/link'

function SVGLogo(props) {
  return (
    <Link href="/">
      <a>
        <svg width="70px" height="70px" viewBox="0 0 100 100" {...props}>
          <path d="M64.934 34.207c-4.48 0-8.129 3.336-8.129 7.438a1.5 1.5 0 003 0c0-2.45 2.3-4.438 5.129-4.438s5.129 1.992 5.129 4.438a1.5 1.5 0 003 0c0-4.098-3.649-7.438-8.129-7.438zM43.699 41.648c0-4.102-3.644-7.438-8.129-7.438-4.48 0-8.129 3.336-8.129 7.438a1.5 1.5 0 003 0c0-2.45 2.301-4.438 5.13-4.438 2.827 0 5.128 1.993 5.128 4.438a1.5 1.5 0 003 0zM76.75 47.211c0 3.457-5.188 3.457-5.188 0 0-3.46 5.188-3.46 5.188 0M28.945 47.211c0 3.457-5.188 3.457-5.188 0 0-3.46 5.188-3.46 5.188 0M56.344 54.871h-12.93a1.5 1.5 0 000 3h12.934a1.5 1.5 0 10-.004-3z" />
          <path d="M60.371 8.297c-11.574-3.816-25.082-.524-33.605 8.195-8.266 8.461-11.438 21.504-7.89 32.45.226.695.495 1.413.808 2.128 1.57 3.633 3.934 6.762 6.215 9.785 2.476 3.278 4.816 6.375 6.21 10.043 2.583 6.786.403 14.352-5.683 19.746a1.501 1.501 0 00.996 2.621c.145 0 .293-.02.438-.066a244.16 244.16 0 011.808-.543c3.07-.914 6.246-1.863 9.2-3.273 13.101-6.266 26.433-13.7 35.183-25.574 3.59-4.871 6.196-10.391 7.547-15.961 4.094-16.898-5.23-34.273-21.227-39.551zm18.312 38.852c-1.254 5.187-3.691 10.336-7.047 14.887-8.36 11.344-21.312 18.55-34.062 24.645-1.715.82-3.55 1.484-5.41 2.082 4.086-5.692 5.164-12.578 2.75-18.926-1.547-4.067-4.125-7.485-6.621-10.785-2.277-3.016-4.43-5.867-5.856-9.168a21.677 21.677 0 01-.707-1.863c-3.164-9.762-.21-21.863 7.184-29.43 5.59-5.723 13.539-8.872 21.492-8.872 3.055 0 6.105.465 9.027 1.43 14.52 4.79 22.977 20.602 19.25 36z" />
        </svg>
      </a>
    </Link>
  )
}

export default SVGLogo
