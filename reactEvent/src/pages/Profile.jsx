import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMe, updateProfile } from '../api/auth';
import '../style/style.css';

function Profile(){
     const { user } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [memberSince, setMemberSince] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    getMe()
    .then((res) =>{
        const u = res.data
        setFullName(u.fullName || '')
        setEmail(u.email || '')
        setPhone(u.phone || '')
        setLocation(u.location || '')
        setMemberSince(u.date_joined)
    }) 
    .catch(() => setError('Failed to load profile'))
    .finally(() => setLoading(false))

  },[])

  const handleSubmit = async(e) =>{
    e.preventDefault()
    setError('')
    setSuccess('')
    try{
        await updateProfile({ full_name: fullName, email, phone, location });
      setSuccess('Profile updated!');
    } catch (err) {
      setError('Failed to update profile.');
    }
    }
  

 if (loading) return <p className="status">Loading profile...</p>;
    return (
 <div className="profile-page">
      <div className="profile-card">
        <div className="profile-card__header">
          <h2 className="profile-card__title-amharic">የእኔ መገለጫ</h2>
          <p className="profile-card__meta">
            Member since {memberSince ? new Date(memberSince).toLocaleString() : '—'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="profile-card__body">
          <div className="form__group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form__group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form__group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form__group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {error && <p className="status status--error">{error}</p>}
          {success && <p className="status status--success">{success}</p>}

          <button className="btn btn--save" type="submit">💾 Save Changes</button>
        </form>

        <div className="profile-card__footer">
          <h3 className="profile-card__subtitle-amharic">የይለፍ ቃል ይቀይሩ</h3>
          <input type="password" placeholder="New password" />
        </div>
      </div>
    </div>
  );

    

}

export default Profile;