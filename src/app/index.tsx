import { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// استيراد الـ Store الخاص بالورديات
import { Shift, useShiftStore } from '../store/shiftStore';

export default function HomeScreen() {
  const { shifts, acceptShift } = useShiftStore();
  const [filter, setFilter] = useState<'all' | 'available' | 'accepted'>('all');

  // حسابات ديناميكية للـ Dashboard تظهر كفاءة الـ State Management
  const availableCount = shifts.filter(s => s.status === 'available').length;
  const acceptedCount = shifts.filter(s => s.status === 'accepted').length;
  const totalEarnings = shifts.filter(s => s.status === 'accepted').reduce((sum, s) => sum + (s.payRate * 8), 0);

  // فلترة اللستة بناءً على التبويب النشط
  const filteredShifts = shifts.filter(shift => {
    if (filter === 'available') return shift.status === 'available';
    if (filter === 'accepted') return shift.status === 'accepted';
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ShiftMaster Pro</Text>
        <Text style={styles.headerSubtitle}>High-Performance Workforce Marketplace</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Dashboard Cards Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>💼</Text>
            <Text style={styles.statValue}>{availableCount}</Text>
            <Text style={styles.statLabel}>Open Shifts</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>✅</Text>
            <Text style={styles.statValue}>{acceptedCount}</Text>
            <Text style={styles.statLabel}>Booked</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>💰</Text>
            <Text style={styles.statValue}>${totalEarnings}</Text>
            <Text style={styles.statLabel}>Est. Earnings</Text>
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.tabRow}>
          {(['all', 'available', 'accepted'] as const).map((type) => (
            <TouchableOpacity 
              key={type}
              style={[styles.tabButton, filter === type && styles.activeTabButton]}
              onPress={() => setFilter(type)}
            >
              <Text style={[styles.tabText, filter === type && styles.activeTabText]}>
                {type.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dynamic Shifts List */}
        <Text style={styles.sectionTitle}>Current Postings</Text>
        {filteredShifts.map((shift: Shift) => (
          <View key={shift.id} style={styles.shiftCard}>
            <View style={styles.shiftHeader}>
              <View>
                <Text style={styles.shiftRole}>{shift.role}</Text>
                <Text style={styles.shiftCompany}>{shift.company}</Text>
              </View>
              <Text style={styles.shiftRate}>${shift.payRate}/hr</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>🕒</Text>
              <Text style={styles.infoText}>{shift.duration}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>📍</Text>
              <Text style={styles.infoText}>{shift.location}</Text>
            </View>

            {/* Dynamic Action Button */}
            {shift.status === 'available' ? (
              <TouchableOpacity 
                style={styles.acceptButton} 
                onPress={() => acceptShift(shift.id)}
              >
                <Text style={styles.buttonText}>Claim Shift</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.bookedBadge}>
                <Text style={styles.bookedIcon}>🎉</Text>
                <Text style={styles.bookedText}>Shift Secured</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// التنسيقات المتوافقة تماماً مع الـ Web والـ Mobile بدون تعارض خطوط
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0F172A' },
  container: { padding: 16 },
  header: { paddingHorizontal: 16, paddingVertical: 20, backgroundColor: '#1E293B', borderBottomWidth: 1, borderColor: '#334155' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#F8FAFC' },
  headerSubtitle: { fontSize: 13, color: '#94A3B8', marginTop: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, marginTop: 10 },
  statCard: { flex: 1, backgroundColor: '#1E293B', padding: 12, borderRadius: 12, marginRight: 8, alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  statIcon: { fontSize: 20, marginBottom: 4 },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#F8FAFC', marginVertical: 4 },
  statLabel: { fontSize: 11, color: '#94A3B8' },
  tabRow: { flexDirection: 'row', backgroundColor: '#1E293B', padding: 4, borderRadius: 8, marginBottom: 20 },
  tabButton: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 6 },
  activeTabButton: { backgroundColor: '#3182CE' },
  tabText: { fontSize: 12, fontWeight: 'bold', color: '#94A3B8' },
  activeTabText: { color: '#FFFFFF' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 12 },
  shiftCard: { backgroundColor: '#1E293B', padding: 16, borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: '#334155' },
  shiftHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  shiftRole: { fontSize: 16, fontWeight: 'bold', color: '#F8FAFC' },
  shiftCompany: { fontSize: 13, color: '#94A3B8', marginTop: 2 },
  shiftRate: { fontSize: 16, fontWeight: 'bold', color: '#3182CE' },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  infoIcon: { fontSize: 14, marginRight: 8 },
  infoText: { color: '#94A3B8', fontSize: 13 },
  acceptButton: { backgroundColor: '#3182CE', paddingVertical: 10, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  bookedBadge: { flexDirection: 'row', backgroundColor: '#064E3B', paddingVertical: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 8, borderWidth: 1, borderColor: '#059669' },
  bookedIcon: { fontSize: 14, marginRight: 6 },
  bookedText: { color: '#34D399', fontWeight: 'bold', fontSize: 14 }
});