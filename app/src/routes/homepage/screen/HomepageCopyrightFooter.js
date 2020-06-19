import React from 'react'
import { CopyrightFooterLayout } from '../styles/HomepageCopyrightFooterStyles'

export const HomepageCopyrightFooter = () => {
  return (
    <CopyrightFooterLayout>
      <div>
        <p>
          Made with <span style={{ color: '#206DFF' }}>&#9829;</span>
        </p>
      </div>
      <div>
        <p>&copy; All rights reserved</p>
      </div>
    </CopyrightFooterLayout>
  )
}
