import React from 'react';
import Header from '../components/header';
import AllSuggestedUsers from '../components/suggestions/all-suggested-user';

export default function SuggestionsPage() {
    return (
        <div className="flex flex-col bg-fa relative" >
            <Header />
            <AllSuggestedUsers />
        </div>
    )
}
