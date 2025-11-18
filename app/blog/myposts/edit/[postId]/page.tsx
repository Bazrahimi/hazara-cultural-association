import React from 'react'

const EditPost = async({params}:{params:Promise<{postId: string}>}) => {
  const {postId} = await params;
  console.log("PostId_______", postId)

  return (
    <div>EditPost</div>
  )
}

export default EditPost