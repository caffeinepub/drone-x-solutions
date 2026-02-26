import React, { useState } from 'react';
import { Loader2, Calendar, Phone, Mail, MapPin, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { useGetAllBookingRequests } from '../../hooks/useQueries';
import { Badge } from '@/components/ui/badge';
import type { BookingRequest } from '../../backend';

function BookingCard({ booking }: { booking: BookingRequest }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card border border-border rounded-sm overflow-hidden">
      <div
        className="p-4 flex items-start justify-between gap-4 cursor-pointer hover:bg-secondary/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-display font-bold text-sm text-foreground">{booking.name}</span>
            <Badge variant="outline" className="text-xs border-accent-yellow/50 text-accent-yellow">
              {booking.serviceType}
            </Badge>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {booking.location}
            </span>
            {booking.preferredDate && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {booking.preferredDate}
              </span>
            )}
          </div>
        </div>
        <button className="text-muted-foreground flex-shrink-0 mt-0.5">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-border px-4 py-4 space-y-3 bg-secondary/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-accent-yellow flex-shrink-0" />
              <a href={`mailto:${booking.email}`} className="text-foreground hover:text-accent-yellow transition-colors truncate">
                {booking.email}
              </a>
            </div>
            {booking.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-accent-yellow flex-shrink-0" />
                <a href={`tel:${booking.phone}`} className="text-foreground hover:text-accent-yellow transition-colors">
                  {booking.phone}
                </a>
              </div>
            )}
          </div>
          {booking.message && (
            <div className="flex items-start gap-2 text-sm">
              <MessageSquare className="w-4 h-4 text-accent-yellow flex-shrink-0 mt-0.5" />
              <p className="text-muted-foreground leading-relaxed">{booking.message}</p>
            </div>
          )}
          <div className="flex gap-2 pt-1">
            <a
              href={`mailto:${booking.email}?subject=Re: Drone X Solutions - ${booking.serviceType} Quote`}
              className="inline-flex items-center gap-1.5 text-xs bg-accent-yellow text-navy-dark font-bold px-3 py-1.5 rounded-sm hover:bg-accent-yellow/90 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              Reply by Email
            </a>
            {booking.phone && (
              <a
                href={`https://wa.me/${booking.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${booking.name}, thank you for your interest in Drone X Solutions!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs bg-green-600 text-white font-bold px-3 py-1.5 rounded-sm hover:bg-green-700 transition-colors"
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminBookingsTab() {
  const { data: bookings, isLoading, error } = useGetAllBookingRequests();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg text-foreground">
          Booking Requests ({bookings?.length ?? 0})
        </h3>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-accent-yellow" />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-destructive text-sm">Failed to load booking requests.</p>
        </div>
      ) : bookings && bookings.length > 0 ? (
        <div className="space-y-3">
          {[...bookings].reverse().map((booking) => (
            <BookingCard key={booking.id.toString()} booking={booking} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card border border-border rounded-sm">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">No booking requests yet.</p>
          <p className="text-muted-foreground text-xs mt-1">
            Requests submitted via the booking form will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
