// theirs
// theirs
import React from 'react'
// components
import HomepagePartnershipsDesktop from '../screen/HomepagePartnershipDesktop'
import HomepagePartnershipsMobile from '../screen/HomepagePartnershipsMobile'
// hook
import { useWindowSize } from '../../../hooks/useWindowSize'

const HomepagePartnerships = () => {
  const screenDimensions = useWindowSize()

  return (
    <>
      {screenDimensions.width >= 1080 && <HomepagePartnershipsDesktop />}
      {screenDimensions.width < 1080 && <HomepagePartnershipsMobile />}
    </>
  )
}

export default HomepagePartnerships
