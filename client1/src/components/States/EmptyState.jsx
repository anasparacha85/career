import { Users } from 'lucide-react'
import React from 'react'

const EmptyState = ({message,description}) => {
  return (
   <div className="empty-state">
              <div className="empty-state-icon">
                <Users size={24} color="#64748b" />
              </div>
              <h3 className="empty-state-title">No Invitations Found</h3>
              <p className="empty-state-message">
                You haven't sent any test invitations yet. Create a test and start inviting candidates.
              </p>
            </div>
  )
}

export default EmptyState
