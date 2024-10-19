import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
  } from '@chakra-ui/react'
function breadeCrumb() {
    return (
        <div>
            <Breadcrumb fontWeight='medium' fontSize='sm'>
                <BreadcrumbItem>
                    <BreadcrumbLink href='#'>Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href='#'>About</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href='#'>Current</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
    )
}

export default breadeCrumb