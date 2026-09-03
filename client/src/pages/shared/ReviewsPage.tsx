import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Star } from 'lucide-react';

export default function ReviewsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Reviews & Ratings</h1>
        <Button>Write a Review</Button>
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-none">
        <CardContent className="p-6 flex items-center gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-green-700">4.8</p>
            <div className="flex text-yellow-400 my-2">
              <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
            </div>
            <p className="text-sm text-gray-500">Based on 124 reviews</p>
          </div>
          <div className="flex-1 space-y-2">
             {/* Rating bars simulation */}
             {[5,4,3,2,1].map(r => (
               <div key={r} className="flex items-center gap-2 text-sm">
                 <span className="w-3">{r}</span>
                 <Star className="w-3 h-3 text-gray-400" />
                 <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                   <div className="h-full bg-yellow-400" style={{width: `${r === 5 ? 80 : r === 4 ? 15 : 5}%`}}></div>
                 </div>
               </div>
             ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                    U{i}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">User {i}</h4>
                    <div className="flex text-yellow-400">
                      <Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" />
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
              <p className="text-gray-600 text-sm mt-2">
                Great quality produce and timely delivery. The packaging was good and everything arrived fresh.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
