import React from 'react'
import { useState } from 'react'
import { supabase } from '../../utils/supabaseClient'

export default function handler(req, res) {
    
    const { id } = req.query;

    const fetch = async () => {
        try 
        {
            
            let { data, error, status } = await supabase
                .from('Doubts_Response')
                .select(`teacher_id ( name ), info, upload `)
                .eq('doubt_id', id)
                .single()

                if (error && status !== 406) {
                    throw error
                    res.status(500).send({ error: error.message })
                }
    
                res.status(200).json({ data });
        
        } 
        catch (error) 
        {
            res.status(500).send({ error: error })
        } 
        finally 
        {
            res.status(200).send('Fetch Completed');
        }
    }

    fetch();
}